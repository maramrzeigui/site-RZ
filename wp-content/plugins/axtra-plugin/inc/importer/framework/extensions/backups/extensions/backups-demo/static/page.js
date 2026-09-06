/**
 * Check current status
 */
jQuery(function ($) {
	var inst = {
		localized: _fw_ext_backups_demo,
		getEventName: function(name) {
			return 'fw:ext:backups-demo:status:'+ name;
		},
		timeoutId: 0,
		timeoutTime: 3000,
		/**
		 * 0 - (false) not busy
		 * 1 - (true) busy
		 * 2 - (true) busy and a pending ajax
		 */
		isBusy: 0,
		doAjax: function() {
			if (this.isBusy) {
				this.isBusy = 2;
				return false;
			}

			clearTimeout(this.timeoutId);

			fwEvents.trigger(this.getEventName('updating'));

			$.ajax({
					url: ajaxurl,
					type: 'POST',
					dataType: 'json',
					data: {
						action: this.localized.ajax_action.status
					}
				})
				.done(_.bind(function(r){
					if (r.success) {
						fwEvents.trigger(this.getEventName('update'), r.data);
					} else {
						fwEvents.trigger(this.getEventName('update-fail'));
					}
				}, this))
				.fail(_.bind(function(jqXHR, textStatus, errorThrown){
					console.error('Ajax error', jqXHR, textStatus, errorThrown);
					fwEvents.trigger(this.getEventName('update-fail'));
				}, this))
				.always(_.bind(function(data_jqXHR, textStatus, jqXHR_errorThrown){
					fwEvents.trigger(this.getEventName('updated'));

					if (this.isBusy === 2) {
						this.isBusy = 0;
						this.doAjax();
					} else {
						this.isBusy = 0;
					}

					this.timeoutId = setTimeout(_.bind(this.doAjax, this), this.timeoutTime);
				}, this));

			return true;
		},
		onUpdate: function(data) {
			this.timeoutTime = data.is_busy ? 3000 : 10000;
		},
		init: function(){
			this.init = function(){};

			fwEvents.on(this.getEventName('do-update'), _.bind(function(){ this.doAjax(); }, this));
			fwEvents.on(this.getEventName('update'), _.bind(function(data){ this.onUpdate(data); }, this));

			this.doAjax();
		}
	};

	// let other scripts to listen events
	setTimeout(function(){ inst.init(); }, 100);
});

/**
 * Current status
 */
jQuery(function($){
	var inst = {
		failCount: 0,
		fwSoleModalId: 'fw-ext-backups-demo-status',
		onUpdating: function(){},
		onUpdate: function(data) {
			if (data.is_busy) {
				fw.soleModal.show(
					this.fwSoleModalId,
					data.html,
					{
						allowClose: false,
						updateIfCurrent: true
					}
				);
			} else {
				fw.soleModal.hide(this.fwSoleModalId);
			}

			this.failCount = 0;
		},
		onUpdateFail: function() {
			if (this.failCount > 3) {
				fw.soleModal.show(
					this.fwSoleModalId,
					'<span class="fw-text-danger dashicons dashicons-warning"></span>',
					{
						allowClose: false,
						updateIfCurrent: true
					}
				);
			}
			++this.failCount;
		},
		onUpdated: function() {},
		init: function(){
			fwEvents.on({
				'fw:ext:backups-demo:status:updating': _.bind(this.onUpdating, this),
				'fw:ext:backups-demo:status:update': _.bind(this.onUpdate, this),
				'fw:ext:backups-demo:status:update-fail': _.bind(this.onUpdateFail, this),
				'fw:ext:backups-demo:status:updated': _.bind(this.onUpdated, this)
			});
		}
	};

	inst.init();
});

/**
 * Install button
 */
jQuery(function($) {
	var inst = {
		localized: _fw_ext_backups_demo,
		isBusy: false,
		fwLoadingId: 'fw-ext-backups-demo-install',
		init: function(){
			fwEvents.on('fw:ext:backups-demo:status:update', function(data){
				{
					$('#fw-ext-backups-demo-list .fw-ext-backups-demo-item').removeClass('active');

					if (data.active_demo.id) {
						$('#demo-'+ data.active_demo.id).addClass('active');
					}
				}

				if (data.active_demo.result) {
					if (data.active_demo.result === true) {
						fw.soleModal.hide(inst.fwLoadingId);

						setTimeout(function(){
							$(document.body).fadeOut();
						}, 500); // after modal hide animation end

						setTimeout(function(){
							window.location.assign(data.home_url);
						}, 1000); // after all animations end
					} else {
						fw.soleModal.show(
							inst.fwLoadingId,
							'<h3 class="fw-text-danger">'+ data.active_demo.result +'</h3>'
						);
					}
				}
			});

			$('#fw-ext-backups-demo-list').on('click', '[data-install]', function(){
				if (inst.isBusy) {
					console.log('Install is busy');
					return;
				}

				var $this = $(this),
					demoId = $this.attr('data-install'),
					confirm_message = $this.attr('data-confirm');

				if (confirm_message) {
					if (!confirm(confirm_message)) {
						return;
					}
				}

				inst.isBusy = true;
				fw.loading.show(inst.fwLoadingId);

				$.ajax({
					url: ajaxurl,
					data: {
						action: inst.localized.ajax_action.install,
						id: demoId
					},
					type: 'POST',
					dataType: 'json'
				})
					.done(function(r){
						if (r.success) {
							fwEvents.trigger('fw:ext:backups-demo:status:do-update');
						} else {
							fw.soleModal.show(
								'fw-ext-backups-demo-install-error',
								((r.data && r.data.length) ? r.data[0].message : '')
							);
						}
					})
					.fail(function(jqXHR, textStatus, errorThrown){
						fw.soleModal.show(
							'fw-ext-backups-demo-install-error',
							'<h2>Ajax error</h2>'+ '<p>'+ String(errorThrown) +'</p>'
						);
					})
					.always(function(data_jqXHR, textStatus, jqXHR_errorThrown){
						inst.isBusy = false;
						fw.loading.hide(inst.fwLoadingId);
					});
			});
		}
	};

	inst.init();
});

/**
 * "Cancel" functionality
 */
jQuery(function($){
	var inst = {
		localized: _fw_ext_backups_demo,
		isBusy: false,
		fwLoadingId: 'fw-ext-backups-demo-install-cancel',
		doCancel: function(){
			if (this.isBusy) {
				return;
			} else {
				if (!confirm(this.localized.l10n.abort_confirm)) {
					return;
				}

				this.isBusy = true;
			}

			inst.isBusy = true;
			fw.loading.show(inst.fwLoadingId);

			$.ajax({
					url: ajaxurl,
					data: {
						action: inst.localized.ajax_action.cancel
					},
					type: 'POST',
					dataType: 'json'
				})
				.done(function(r){
					if (r.success) {
						fwEvents.trigger('fw:ext:backups-demo:status:do-update');
					} else {
						console.warn('Cancel failed');
					}
				})
				.fail(function(jqXHR, textStatus, errorThrown){
					fw.soleModal.show(
						'fw-ext-backups-demo-install-error',
						'<h2>Ajax error</h2>'+ '<p>'+ String(errorThrown) +'</p>'
					);
				})
				.always(function(data_jqXHR, textStatus, jqXHR_errorThrown){
					inst.isBusy = false;
					fw.loading.hide(inst.fwLoadingId);
				});
		},
		init: function(){
			var that = this;

			fwEvents.on('fw:ext:backups-demo:cancel', function(){
				that.doCancel();
			});
		}
	};

	inst.init();
});

/**
 * If loopback request failed, execute steps via ajax
 * @since 2.0.5
 */
jQuery(function($){
	if (typeof fw_ext_backups_loopback_failed == 'undefined') {
		return;
	}

	var inst = {
		running: false,
		isBusy: false,
		onUpdate: function(data) {
			this.running = data.is_busy;
			this.executeNextStep(data.ajax_steps.token, data.ajax_steps.active_tasks_hash);
		},
		executeNextStep: function(token, activeTasksHash){
			if (!this.running || this.isBusy) {
				return false;
			}

			this.isBusy = true;

			$.ajax({
					url: ajaxurl,
					data: {
						action: 'fw:ext:backups:continue-pending-task',
						token: token,
						active_tasks_hash: activeTasksHash
					},
					type: 'POST',
					dataType: 'json'
				})
				.done(function(r){ console.log(r);
					if (r.success) {
						fwEvents.trigger('fw:ext:backups-demo:status:do-update');
					} else {
						console.error('Ajax execution failed');
						// execution will try to continue on next (auto) update
					}
				})
				.fail(_.bind(function(jqXHR, textStatus, errorThrown){
					console.error('Ajax error: '+ String(errorThrown));
				}, this))
				.always(_.bind(function(data_jqXHR, textStatus, jqXHR_errorThrown){
					this.isBusy = false;
				}, this));
		},
		init: function(){
			fwEvents.on('fw:ext:backups-demo:status:update', _.bind(this.onUpdate, this));
		}
	};

	inst.init();
});
/**
 * Demo js input fields
 * @since 3.0
 */
jQuery(function($){
    // Text By Search Filter
	$(document).on('keyup keypress', '#wcf-demo-items-search-js' , function(e){		
		$('.filter-by-cat select').val('');
		var key = e.which;
		if(key == 13)  // the enter key code
		 {
			wcf_filter_demo_content();			
		}else{
			wcf_filter_demo_content();			
		}
		
	});
	
	$(document).on('click', '.btn-icon-content' , function(){
		wcf_filter_demo_content();
	});
		
    function wcf_filter_demo_content(){
		var txt = $('#wcf-demo-items-search-js').val();
		var $all_items = $('.wcf-demo-item .wcf-demo-tpl-name');
        if(txt.length > 0){
			$all_items.each(function(i, obj) {
				if($( this ).text().toLowerCase().indexOf( txt.toLowerCase() ) >= 0){
					$( this ).parent('.wcf-demo-item').show();
				}else{
					$( this ).parent('.wcf-demo-item').hide();
				}				
			});
        }else{
			$all_items.each(function(i, obj) {
				$( this ).parent('.wcf-demo-item').show();
			});
        }
    }    
    //Category
    let $total_options = $('.fw-ext-backups-demo-item.wcf-demo-item');
    let $options_array = [];
    $total_options.each(function(i,obj){
      if($(this).attr('data-cat')){
		const currentArray = $(this).attr('data-cat').split(" ");   	
		$options_array = [... new Set([...$options_array, ...currentArray])];
      }
    });
    
    if($total_options.length < 4){
      $('.theme-wcf-filter-area').hide();
    }else{
		$('.theme-wcf-filter-area').show();
    }
    // Append here   
	
	$.each( $options_array, function( key, value ) {		
	    $('.filter-by-cat select').append($('<option>', {
			value: value,
			text: value.charAt(0).toUpperCase() + value.slice(1)
		}));
	  });
	
    $(document).on('change', '.filter-by-cat select' ,function(){  
      const select_cat = $(this).val();
      if($(this).val().length > 1){
		$total_options.each(function(i,obj){
			if($(this).attr('data-cat')){
			  const currentArray = $(this).attr('data-cat').split(" ");  			 
			  if(currentArray.includes(select_cat)){
			    $(this).show();
			  }else{
				$(this).hide();
			  }
			}
		});
      }else{
      
		$total_options.each(function(i,obj){
			$(this).show();
		});
      
      }
           
    });
});