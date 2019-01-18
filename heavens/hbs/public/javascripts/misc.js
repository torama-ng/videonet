$(document).on('mouseenter', "p", function () {
    var $this = $(this);
    if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
        $this.tooltip({
            title: $this.text(),
            placement: "bottom"
        });
        $this.tooltip('show');
    }
  });
  $('.card-text').css('width',$('.card-text').parent().width());
s  