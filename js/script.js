var all_pins = [],
  map_timer,
  all_tooltips = [],
  mapProp = {
    zoom: 15,
    // disableDefaultUI: true,
    scrollwheel: false,
    // navigationControl: false,
    mapTypeControl: false,
    scaleControl: true
  },
  gmap,
  center,
  body_var,
  serviceSlider;

function loadMap() {

  // без таймаута не работает :(

  setTimeout(function () {
    center = new google.maps.LatLng(47.301969, 39.715053);
    gmap = new google.maps.Map(document.getElementById("ksk_map"), mapProp);
    gmap.setCenter(center);

    createPin(gmap, 'KSK', {
      lat: 47.301969,
      lng: 39.715053
    });

  }, 0);
}

function confirmDialogDefaults() {
  jconfirm.defaults = {
    title: '',
    titleClass: '',
    type: 'default',
    typeAnimated: true,
    draggable: true,
    dragWindowGap: 15,
    dragWindowBorder: true,
    animateFromElement: true,
    smoothContent: true,
    content: '',
    buttons: {},
    defaultButtons: {
      ok: {
        action: function () {
        }
      },
      close: {
        action: function () {
        }
      }
    },
    contentLoaded: function (data, status, xhr) {
    },
    icon: '',
    lazyOpen: false,
    bgOpacity: null,
    theme: 'light',
    animation: 'scale',
    closeAnimation: 'scale',
    animationSpeed: 400,
    animationBounce: 1,
    rtl: false,
    container: 'body',
    containerFluid: true,
    backgroundDismiss: false,
    backgroundDismissAnimation: 'shake',
    autoClose: false,
    closeIcon: true,
    closeIconClass: '',
    watchInterval: 100,
    columnClass: '',
    boxWidth: '95%',
    scrollToPreviousElement: true,
    scrollToPreviousElementAnimate: true,
    useBootstrap: true,
    offsetTop: 10,
    offsetBottom: 10,
    onContentReady: function () {
    },
    onOpenBefore: function () {
    },
    onOpen: function () {
      body_var.addClass('confirm_opened');
    },
    onClose: function () {
      body_var.removeClass('confirm_opened');
    },
    onDestroy: function () {
      body_var.removeClass('confirm_opened');
    },
    onAction: function () {
    }
  };
}

function callbackDialog() {
  $.confirm({
    title: '',
    content: $('#callback_popup').html(),
    columnClass: 'callback_dialog',
    buttons: {
      confirm: {
        btnClass: 'btn_v2 action_btn_2 order_btn',
        text: '<span class="btn_text">отправить заявку</span>',
        action: function () {
          console.log('order callback here');
        }
      }
    }
  });
}

function initServiceSlider() {

  serviceSlider = $('.serviceSlider').slick({
    //variableWidth: true,
    dots: false,
    mobileFirst: true,
    infinite: true,
    arrows: true,
    swipe: true,
    accessibility: false,
    autoplay: false,
    autoplaySpeed: 3000,
    //centerMode: true,
    //variableWidth: true,
    speed: 600,
    zIndex: 1,
    initialSlide: 0,
    //asNavFor: '.activeTabSlider, .productOptionSlider',
    //centerPadding: '0',
    slide: '.serviceSlider .slide',
    prevArrow: '.serviceSlider .slide_prev',
    nextArrow: '.serviceSlider .slide_next',

    //variableWidth: true,
    slidesToShow: 3,

    slidesToScroll: 3,
    touchThreshold: 10
  });

}

function createPin(target_map, name, latlng, icon, icon_hover, magic_top_offset) {
  var img = new Image(), marker;

  if (icon && icon.length) {
    $(img).one('load', function () {
      var image = new google.maps.MarkerImage(
        icon,
        new google.maps.Size(img.width, img.height),
        new google.maps.Point(0, 0),
        new google.maps.Point((img.width / 2).toFixed(), img.height + (magic_top_offset || 0))
      );

      marker = new google.maps.Marker({
        position: latlng,
        map: target_map,
        icon: image,
        title: name
      });

      if (icon_hover && icon_hover.length) {
        google.maps.event.addListener(marker, 'mouseover', function () {
          marker.setIcon(icon_hover);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
          marker.setIcon(icon);
        });
      }

      return marker;
    });

    img.src = icon;

  } else {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });

    if (icon_hover && icon_hover.length) {
      google.maps.event.addListener(marker, 'mouseover', function () {
        marker.setIcon(icon_hover);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
        marker.setIcon(icon);
      });
    }

    return marker;
  }
}

$(window).resize(function () {

});

$(function ($) {

  body_var = $('body');

  initSelect();

  confirmDialogDefaults();

  initServiceSlider();

  body_var.delegate('.openCallbackPopup', 'click', function () {
    callbackDialog();

    return false;
  });

});

function initSelect() {
  $.fn.select2.amd.define('select2/i18n/ru', [], function () {
    // Russian
    return {
      errorLoading: function () {
        return 'Результат не может быть загружен.';
      },
      inputTooLong: function (args) {
        var overChars = args.input.length - args.maximum;
        var message = 'Пожалуйста, удалите ' + overChars + ' символ' + plural(overChars, '', 'а', 'ов');
        if (overChars >= 2 && overChars <= 4) {
          message += 'а';
        } else if (overChars >= 5) {
          message += 'ов';
        }
        return message;
      },
      inputTooShort: function (args) {
        var remainingChars = args.minimum - args.input.length;

        var message = 'Пожалуйста, введите ' + remainingChars + ' или более символов';

        return message;
      },
      loadingMore: function () {
        return 'Загружаем ещё ресурсы…';
      },
      maximumSelected: function (args) {
        var message = 'Вы можете выбрать ' + args.maximum + ' элемент' + plural(args.maximum, '', 'а', 'ов');

        if (args.maximum >= 2 && args.maximum <= 4) {
          message += 'а';
        } else if (args.maximum >= 5) {
          message += 'ов';
        }

        return message;
      },
      noResults: function () {
        return 'Ничего не найдено';
      },
      searching: function () {
        return 'Поиск…';
      }
    };
  });

  var s2options = {
    language: 'ru',
    width: '100%',
    closeOnSelect: true,
    allowClear: false,
    minimumResultsForSearch: 3,
    containerCssClass: "select_c2"
  };

  $('.select2').each(function (ind) {
    var $slct = $(this),
      cls = $slct.attr('data-select-class') || '',
      opt = {
        placeholder: $slct.attr('data-placeholder') || 'Выберите...',
        dropdownParent: $slct.parent(),
        adaptDropdownCssClass: function (c) {
          return cls;
        }
      };

    opt = $.extend({}, opt, s2options);

    $slct.select2(opt);
  });
}
