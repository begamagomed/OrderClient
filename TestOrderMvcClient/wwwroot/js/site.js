// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var urlOrders = 'https://localhost:44317/api/Orders';
var urlDetails = 'https://localhost:44317/api/OrderDetails/';

$(document).ready(function () {
    function RefreshOrders() {
        let container = $('#orders table tbody');
        let orders = "";
        $.ajax({
            url: urlOrders,
            type: 'GET',
            beforeSend: function () {
                container.html("<div class='text-center'>wait...</div>");
            },
            success: function (data) {
                $.each(data, function (index, item) {
                    let tr = "<tr data-id='"+item.id+"'>" +
                        "<td></td>" +
                        "<td> Order #" + item.id + "</td>" +
                        "<td>" + item.setDate + "</td>" +
                        "</tr>";
                    orders += tr;
                });
                container.html(orders);
            },
            complete: function () {},
            error: function (jqXHR, exception) {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                container.html(msg);
                }
        });
    }
    function GetOrderDetails(id) {
        let container = $('#details');
        let details = "";
        $.ajax({
            url: urlDetails+id,
            type: 'GET',
            beforeSend: function () {
                container.html("<div class='text-center'>wait...</div>");
            },
            success: function (data) {
                let total = data.reduce((accum, item) => accum + item.total, 0)
                let info = "<div class=''>" +
                    "<div> Number:" + data[0].order.id + "</div>" +
                    "<div> Date:" + data[0].order.setDate + "</div>" +
                    "<div> Status:" + data[0].order.status.name+"</div>" +
                    "<br/>" +
                    "<div> Total:" +total+"</div>" +
                    "</div>";
                let table = "<table class='table' id='detailsTable'>" +
                    "<thead>" +
                    "<tr>" +
                    "<th>Product Name</th>" +
                    "<th>Qty</th>" +
                    "<th>Price</th>" +
                    "<th>Total</th>" +
                    "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                    "</tbody>" +
                    "</table>";
                let trs = "";
                $.each(data, function (index, item) {
                    let tr = "<tr>" +
                        "<td>Product " + item.id+"</td>" +
                        "<td>" + item.qty + "</td>" +
                        "<td>" + item.price + "</td>" +
                        "<td>" + item.total + "</td>" +
                        "</tr>";
                    trs += tr;
                });
                container.html(info + table);
                $('#detailsTable tbody').html(trs);
                console.log(trs);
            },
            complete: function () { },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                orderContainer.html(msg);
            }
        });
    }
    RefreshOrders();
    $('#refresh').click(function () {
        RefreshOrders();
    });

    $(document).on('click', '#orders table tbody tr', function () {
        $('#orders table tbody tr').removeClass('active');
        $(this).addClass('active');
        let id = $(this).data('id');
        GetOrderDetails(id);
    })
});
