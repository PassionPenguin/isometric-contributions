function icRun() {
  var target = document.querySelector('.calendar-graph');

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        var days = $('#calendar-graph  rect');
        d3.selectAll(days).attr("data-contrib-count", function(d, i) { return d[1]; });
      }
    });
  });

  observer.observe(target, { attributes: true, childList: true, characterData: true});
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ icRun +')();'));
document.documentElement.appendChild(script);

$(function() {

  $('<canvas id="isometric-contributions" width="721" height="500"></canvas>').insertBefore('#contributions-calendar');

  var SIZE      = 10;
  var GH_OFFSET = 13;

  var canvas = document.getElementById('isometric-contributions');

  // create pixel view container in point
  var point = new obelisk.Point(100, 50);
  var pixelView = new obelisk.PixelView(canvas, point);

  var color;
  var color0 = new obelisk.CubeColor().getByHorizontalColor(0xeeeeee);
  var color1 = new obelisk.CubeColor().getByHorizontalColor(0xd6e685);
  var color2 = new obelisk.CubeColor().getByHorizontalColor(0x8cc665);
  var color3 = new obelisk.CubeColor().getByHorizontalColor(0x44a340);
  var color4 = new obelisk.CubeColor().getByHorizontalColor(0x1e6823);

  var contribCount;

  $('#calendar-graph g > g').each(function(g) {
    $(this).find('rect').each(function(r) {
      var r = $(this).get(0);
      var y = $(this).attr('y') / GH_OFFSET;
      var style = $(this).attr('style');

      $(this).mouseover();
      // var html = $('.svg-tip').html();
      // debugger;
      // contribCount = d3.select(r).data()[0][1];
      // console.log(contribCount);
      // var matches = $('.svg-tip').html().match(/(\d+) contributions/);
      // id = matches !== null ? matches[1] : '';

      var contribCount;
      var weightedCount = Math.random();

      if      (weightedCount < 0.4) contribCount = Math.floor(weightedCount * 12);
      else if (weightedCount < 0.5) contribCount = Math.floor(weightedCount * 15);
      else if (weightedCount < 0.6) contribCount = Math.floor(weightedCount * 20);
      else if (weightedCount < 0.7) contribCount = Math.floor(weightedCount * 25);

      if (contribCount <= 3) contribCount = 3;
      var dimension = new obelisk.CubeDimension(SIZE, SIZE, contribCount);

      if      (style == 'fill: rgb(238, 238, 238);') color = color0;
      else if (style == 'fill: rgb(214, 230, 133);') color = color1;
      else if (style == 'fill: rgb(140, 198, 101);') color = color2;
      else if (style == 'fill: rgb(68, 163, 64);')   color = color3;
      else if (style == 'fill: rgb(30, 104, 35);')   color = color4;

      var cube = new obelisk.Cube(dimension, color, false);
      var p3d = new obelisk.Point3D(SIZE * g, SIZE * y, 0);
      pixelView.renderObject(cube, p3d);
    });
  });

});

