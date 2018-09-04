$(function() {
  $('#create').on('click', () => {
    const plate = $('.license-plate').val();
    const d = new Date();
    const timeStamp = moment(d).format('h.mma');
    const barcodeData = plate + ' ' + timeStamp;
    // $("#barcode").JsBarcode(plate + ' ' + timeStamp);
    // JsBarcode("#barcode", plate + ' ' + timeStamp, {
    //   width:1
    // });

    $.get('LicensePlate.label', function(labelXml) {
      var label = dymo.label.framework.openLabelXml(labelXml);
      label.setObjectText('BARCODE', barcodeData.toUpperCase());
      label.print('DYMO LabelWriter 400');
    }, 'text');
  });
});
