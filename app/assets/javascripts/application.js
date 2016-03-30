function ShowHideContent() {
  var self = this;

  self.escapeElementName = function(str) {
    result = str.replace('[', '\\[').replace(']', '\\]')
    return(result);
  };

  self.showHideRadioToggledContent = function () {
    $(".block-label input[type='radio']").each(function () {

      var $radio = $(this);
      var $radioGroupName = $radio.attr('name');
      var $radioLabel = $radio.parent('label');

      var dataTarget = $radioLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (dataTarget) {

        // Set aria-controls
        $radio.attr('aria-controls', dataTarget);

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $radio.closest('form').find(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {
            var $this = $(this);

            var groupDataTarget = $this.parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $this.attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

          var $dataTarget = $('#' + dataTarget);
          $dataTarget.show();
          // Set aria-expanded and aria-hidden for clicked radio
          $radio.attr('aria-expanded', 'true');
          $dataTarget.attr('aria-hidden', 'false');

        });

      } else {
        // If the data-target attribute is undefined for a radio button,
        // hide visible data-target content for radio buttons in the same group

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {

            var groupDataTarget = $(this).parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $(this).attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

        });
      }

    });
  }
  self.showHideCheckboxToggledContent = function () {

    $(".block-label input[type='checkbox']").each(function() {

      var $checkbox = $(this);
      var $checkboxLabel = $(this).parent();

      var $dataTarget = $checkboxLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {

        // Set aria-controls
        $checkbox.attr('aria-controls', $dataTarget);

        // Set aria-expanded and aria-hidden
        $checkbox.attr('aria-expanded', 'false');
        $('#'+$dataTarget).attr('aria-hidden', 'true');

        // For checkboxes revealing hidden content
        $checkbox.on('click', function() {

          var state = $(this).attr('aria-expanded') === 'false' ? true : false;

          // Toggle hidden content
          $('#'+$dataTarget).toggle();

          // Update aria-expanded and aria-hidden attributes
          $(this).attr('aria-expanded', state);
          $('#'+$dataTarget).attr('aria-hidden', !state);

        });
      }

    });
  };
}

$(document).ready(function() {

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  var toggleContent = new ShowHideContent();
  toggleContent.showHideRadioToggledContent();
  toggleContent.showHideCheckboxToggledContent();

  // Function for tab panels
  $("a#tab-current-sp-value").click(function() {
      $(".tabs-nav li").removeClass("active");
      $(this).parent().addClass("active");
      $("#current-sp-value").show();
      $("#contracted-out").hide();
      $("#improve-sp-value").hide();
      window.location.hash = "#lie-current-sp-value";
      return false;
  });
     $("a#tab-contracted-out").click(function() {
      $(".tabs-nav li").removeClass("active");
      $(this).parent().addClass("active");
      $("#contracted-out").show();
      $("#improve-sp-value").hide();
      $("#current-sp-value").hide();
      window.location.hash = "#lie-contracted-out";
      return false;
  });
  $("a#tab-improve-sp-value").click(function() {
      $(".tabs-nav li").removeClass("active");
      $(this).parent().addClass("active");
      $("#improve-sp-value").show();
      $("#contracted-out").hide();
      $("#current-sp-value").hide();
      window.location.hash = "#lie-improve-sp-value";
      return false;
  });

  if(window.location.hash === "#lie-current-sp-value") {
      $("a#tab-current-sp-value").trigger('click');
  }
   else if (window.location.hash === "#lie-contracted-out") {
      $("a#tab-contracted-out").trigger('click');
  }
  else if (window.location.hash === "#lie-improve-sp-value") {
      $("a#tab-improve-sp-value").trigger('click');
  }

  // Tab Panes
  $('.tab-panes').each(function() {
    $(this).children('div').hide();
    $(this).children('.tab-pane:first').show();
    $(this).parent().find('.tab-link:first').addClass('tab-link-active');
  });

  $(document).on('click', '.tab-link', function(e) {
    e.preventDefault();
    
    var nth = $(this).index() + 1;
    var target = $(this).parents('.tab-panel').find('.tab-pane:nth-child(' + nth + ')');

    $(this).parents('.tab-panel').find('.tab-link').removeClass('tab-link-active');
    $(this).addClass('tab-link-active');

    $(this).parents('.tab-panel').find('.tab-panes').children().hide();
    target.show();
  });
});
