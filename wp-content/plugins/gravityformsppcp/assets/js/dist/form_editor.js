!function(){var t={784:function(){!function(t){var e={subscriptions:{getNoticeContainer:function(){return t("#gf-paypal-checkout-unsupported-payment-warning")},getUnsupportedPaymentMethodMarkup:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1?arguments[1]:void 0;if(e){var n='\t\t\t\t\t\t\n\t\t\t\t\t<div id="gf-paypal-checkout-unsupported-payment-warning" class="gform-alert gform-alert--notice gform-alert--inline" data-js="gform-alert">\n\t\t\t\t\t\t<span class="gform-alert__icon gform-icon gform-icon--circle-notice" aria-hidden="true"></span>\n\t\t\t\t\t\t<div class="gform-alert__message-wrap">\n\t\t\t\t\t\t\t<p class="gform-alert__message">'.concat(e,"</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t");return t&&(n='\t\t\t\t\t\t\n\t\t\t\t\t\t<div id="gf-paypal-checkout-unsupported-payment-warning" class="gform-settings__wrapper gform-alert__legacy">\n\t\t\t\t\t\t\t<div class="alert gforms_note_warning alert_yellow">\n\t\t\t\t\t\t\t\t<p>'.concat(e,"</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t")),n}}}};window.GFPayPalCheckoutUtils=e}(jQuery)}},e={};function n(a){var i=e[a];if(void 0!==i)return i.exports;var s=e[a]={exports:{}};return t[a](s,s.exports,n),s.exports}!function(){"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var e,a;n(784),window.GFPPCPFormEditor=null,e=jQuery,a=gform_ppcp_form_editor_strings,window.GFPPCPFormEditor=function(){var n=this,i=a.form_data[form.id];n.paypalButtons=!1,n.isRenderingButtons=!1,n.isLegacy="true"===a.is_legacy,n.subscriptions={feedExists:"true"===i.has_feed,unsupportedPaymentMethod:function(t){return-1===e.inArray(t,i.supported_methods)},showNotice:"true"===i.show_notice},n.fieldContainer=".gform_ppcp_custom_card_fields",n.init=function(){n.utils=GFPayPalCheckoutUtils,n.hooks(),n.bindFieldAdded(),n.bindLoadFieldSettings(),n.bindSetPaymentMethod(),n.maybeLoadSubscriptionsNotice()},n.hooks=function(){gform.addAction("gform_post_load_field_settings",(function(i){var s,r,o=(r=2,function(t){if(Array.isArray(t))return t}(s=i)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var a,i,s,r,o=[],d=!0,p=!1;try{if(s=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;d=!1}else for(;!(d=(a=s.call(n)).done)&&(o.push(a.value),o.length!==e);d=!0);}catch(t){p=!0,i=t}finally{try{if(!d&&null!=n.return&&(r=n.return(),Object(r)!==r))return}finally{if(p)throw i}}return o}}(s,r)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?t(e,n):void 0}}(s,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),d=o[0];o[1],"paypal"===d.type?(n.renderSmartPaymentButtons(d),n.bindRerenderSmartPaymentButtons(d),""===a.initialize_api&&setTimeout((function(){HideSettings()}),.01),e("#field_paypal_default_payment_method").val(d.defaultPaymentMethod).on("change",(function(){var t=e(this).val();e(".gform_ppcp_payment_method select").val(t),SetFieldProperty("defaultPaymentMethod",t)})),e("#paypal_payment_buttons").prop("checked",d.paypalPaymentButtons).on("change",(function(){SetFieldProperty("paypalPaymentButtons",e("#paypal_payment_buttons").is(":checked"))})),e(".input_placeholders_setting").on("input propertychange",".input_placeholder",(function(){var t=e(this).closest(".input_placeholder_row").data("input_id");-1===e(this).attr("id").indexOf(".5")&&e("#input_"+t.toString().replace(".","_")).text(this.value)})),e(".credit_card_setting ul li").each((function(t,n){"jcb"===e(n).children("input").val()&&e(n).hide()})),n.togglePaymentMethodFields(d.methods,!0),e("#paypal_credit_messages_setting").prop("checked",d.displayCreditMessages).on("change",(function(){SetFieldProperty("displayCreditMessages",e("#paypal_credit_messages_setting").is(":checked")),n.renderSmartPaymentButtons(d)}))):n.paypalButtons=!1})),gform.addFilter("gform_form_editor_can_field_be_added",(function(t,e){return"paypal"!==e||GetFieldsByType(["paypal"]).length<1?t:(alert(a.only_one_paypal_field),!1)}))},n.bindFieldAdded=function(){e(document).bind("gform_field_added",(function(t,e,a){"paypal"===a.type&&n.renderSmartPaymentButtons(a)}))},n.renderSmartPaymentButtons=function(t){var a="#gform_ppcp_smart_payment_buttons",i=e(a);if(!n.isRenderingButtons&&i.length&&void 0!==window.paypal){n.isRenderingButtons=!0,i.addClass(t.buttonsSize),i.html(""),t.displayCreditMessages&&!e("#paypal_credit_messages").length?e('<div id="paypal_credit_messages" data-pp-message data-pp-style-layout="text" data-pp-style-logo-type="inline" data-pp-style-color="black" data-pp-amount=""></div>').insertBefore(i):!t.displayCreditMessages&&e("#paypal_credit_messages").length&&e("#paypal_credit_messages").remove();var s={style:{layout:t.buttonsLayout,color:t.buttonsColor,shape:t.buttonsShape},onInit:function(t,e){e.disable()}};this.subscriptions.feedExists&&(s.createSubscription=function(){return!1}),n.maybeClosePaypalButton(),n.paypalButtons=window.paypal.Buttons(s),n.paypalButtons.render(a).then((function(){n.isRenderingButtons=!1}))}},n.maybeClosePaypalButton=function(){n.paypalButtons&&void 0!==n.paypalButtons.close&&n.paypalButtons.close()},n.bindRerenderSmartPaymentButtons=function(t){e("#smart_payment_buttons_container select").off("change").on("change",(function(){var a=e(this).attr("id"),i=e(this).val();SetFieldProperty(a,i),n.renderSmartPaymentButtons(t)}))},n.resetSettingsFields=function(t){n.paypalButtons=!1,n.hidePaypalFields(),n.getCreditCardFields(!0).removeClass("paypal"),e(".credit_card_setting ul li:hidden").show()},n.bindLoadFieldSettings=function(){e(document).bind("gform_load_field_settings",(function(t,i,s){if("paypal"===i.type){for(var r in n.getCreditCardFields().addClass("paypal"),""===a.is_custom_card_fields_supported&&(i.methods=["PayPal Checkout"],SetFieldProperty("methods",i.methods)),i.methods)"Credit Card"===i.methods[r]?e("#paypal_payment_custom_card_fields").prop("checked",!0):e("#paypal_payment_smart_payment_buttons").prop("checked",!0);for(var o in i.creditCards)i.creditCards.hasOwnProperty(o)&&e("#field_credit_card_"+i.creditCards[o]).prop("checked",!0);var d="active1.png",p="active0.png",l=a.imgurl,u=i.inputs[4],c=n.getParameter(u.isHidden,!1),_=c?a.inactive:a.active,m=c?p:d;e(".input_placeholders.paypal tr:eq(4)").toggle(!c),e(".sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(0)").prepend("<td><strong>"+a.show+"</strong></td>"),e(".sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(1), .sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(2), .sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(3), .sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(5)").prepend("<td></td>"),e(".sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(4)").prepend("<td><img data-input_id='"+i.id+".5' alt='"+_+"' class='input_active_icon cardholder_name' src='"+l+m+"'/></td>"),e(".sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(4) td:eq(2) input").prop("disabled",c),e(".sub_labels_setting.paypal .input_active_icon.cardholder_name").off("click keypress").on("click keypress",(function(t){t.stopImmediatePropagation();var n=e(this),a=n.attr("src").indexOf(d)>=0,s=a?d:p,r=a?p:d,o=n.attr("src").replace(s,r);n.attr("src",o),e("#input_"+i.id+"_5_container").toggle(!a),e(".sub_labels_setting.paypal .field_custom_inputs_ui tr:eq(4) td:eq(2) input").prop("disabled",a),e("#input_placeholder_row_input_"+i.id+"_5").toggle(!a),SetInputHidden(a,u.id)})),["buttonsLayout","buttonsSize","buttonsShape","buttonsColor"].forEach((function(t){e("#"+t).val(i[t])}))}else n.resetSettingsFields(i)}))},n.getCreditCardFields=function(t){var a=e("\n\t\t\t\t.input_placeholders_setting,\n\t\t\t\t.sub_labels_setting,\n\t\t\t\t.sub_label_placement_setting,\n\t\t\t\t.credit_card_setting,\n\t\t\t\t.credit_card_style_setting,\n\t\t\t\t.label_placement_setting,\n\t\t\t\t.error_message_setting,\n\t\t\t\t.css_class_setting\n\t\t\t\t");return n.getParameter(t,!1)?a.filter(".paypal"):a},n.togglePaymentMethodFields=function(t,a){a=n.getParameter(a,!1);var i="Credit Card",s=!1===this.subscriptions.unsupportedPaymentMethod(i),r=e.inArray(i,t)>=0&&s,o=e.inArray("PayPal Checkout",t)>=0;n.toggleCreditCardFields(a,r),n.toggleSmartButtonFields(a,o,r),n.toggleDefaultPaymentMethod(a,s)},n.toggleCreditCardFields=function(t,a){a?(e(".ginput_container_custom_card_fields:hidden").fadeIn(),n.getCreditCardFields(!0).filter(":hidden").fadeIn()):(e(".ginput_container_custom_card_fields:visible").fadeOut(),t?n.getCreditCardFields(!0).hide():n.getCreditCardFields(!0).fadeOut())},n.toggleSmartButtonFields=function(t,n,a){n?(e(".smart_payment_buttons_settings:hidden").fadeIn(),e(".smart_payment_buttons_note:hidden").fadeIn()):(e(".smart_payment_buttons_settings").fadeOut(),e(".smart_payment_buttons_note:visible").fadeOut())},n.showDefaultPaymentMethod=function(t){return!t||e(".supported_payment_methods input:checked").length<=1},n.toggleDefaultPaymentMethod=function(t,a){n.showDefaultPaymentMethod(a)?(e(".gform_ppcp_payment_method:visible").fadeOut(),t?e(".paypal_default_payment_method").hide():e(".paypal_default_payment_method").fadeOut()):(e(".paypal_default_payment_method:hidden").fadeIn(),e(".gform_ppcp_payment_method:hidden").fadeIn())},n.hidePaypalFields=function(){n.getCreditCardFields(!0).hide(),e(".supported_payment_methods").hide(),e(".paypal_default_payment_method").hide()},n.SetPaymentMethods=function(t,i){var s=GetSelectedField().methods?GetSelectedField().methods:new Array,r=e(i).val(),o=e(i).attr("data-method-options");if(e(i).is(":checked"))e("#"+o).show(),-1===e.inArray(r,s)&&(s[s.length]=r);else{if(e("#"+o).hide(),s.length<=1)return alert(a.must_have_method),t.preventDefault(),!1;var d=e.inArray(r,s);-1!==d&&s.splice(d,1)}SetFieldProperty("methods",s),n.maybeDisplayUnsupportedPaymentMethodMessage(i,r),n.togglePaymentMethodFields(s)},n.maybeDisplayUnsupportedPaymentMethodMessage=function(t,n){var a=e(t),i=e(this.fieldContainer).find("#gf-paypal-checkout-unsupported-payment-warning");i.length||e(this.fieldContainer).append(i),this.subscriptions.feedExists&&this.subscriptions.unsupportedPaymentMethod(n)&&a.is(":checked")?i.show():i.hide()},n.maybeLoadSubscriptionsNotice=function(){var t=jQuery(".gform-compact-view").length>0;this.subscriptions.feedExists&&!t&&(e(this.fieldContainer).append(this.utils.subscriptions.getUnsupportedPaymentMethodMarkup(this.isLegacy,gform_ppcp_form_editor_strings.unsupported_payment_option_message)),this.subscriptions.notice=this.utils.subscriptions.getNoticeContainer(),this.subscriptions.showNotice||this.subscriptions.notice.hide())},n.bindSetPaymentMethod=function(){e(".supported_payment_methods input:checkbox:not([data-option])").on("click keypress",(function(t){n.SetPaymentMethods(t,this)}))},n.getParameter=function(t,e){return void 0===t?e:t},n.init()},e(document).ready(GFPPCPFormEditor)}()}();
//# sourceMappingURL=form_editor.js.map