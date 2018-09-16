$(document).ready(function () {
    $.ajax({
        url: "api/employees",
        method: "GET",
        dataType: "html",
        success: function (data) {
            debugger
            if (data) {
                var customers = JSON.parse(data);
                $.each(customers, function (index, item) {
                    //var info = 'KH' + item['ID'].toString().padStart(4, '0') + '-' + item['Code'] + '-' + item['Name'] + '<br/>';
                    var info = '<tr count="true">'
                        + '<td>' + item['MaNhanVien'] + '</td>'
                        + '<td>' + item['HoVaTen'] + '</td>'
                        + '<td>' + item['GioiTinh'] + '</td>'
                        + '<td>' + item['NgaySinh'] + '</td>'
                        + '<td>' + item['DiaChi'] + '</td>'
                        + '<td>' + item['DienThoai'] + '</td>'
                        + '<td>' + item['Email'] + '</td>'
                        + '<td>' + item['ViTriCongViec'] + '</td>'
                        + '<td>' + item['DonViCongTac'] + '</td>'
                        + '</tr>';
                    $('.my-index-table-body').append(info);
                });
            }
        },
        error: function (data) {
            debugger
        },
        done: function (data) {
            debugger
        },
        fail: function (data) {
            debugger
        }
    });
});