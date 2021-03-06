﻿$(document).ready(function () {
    //check empty
    function emptyCheck(input) {
        var currentInput = $(input);
        if ($(currentInput).val().trim() === "") {
            $(currentInput).addClass('border-red');
            $(currentInput).attr("title", 'Trường này không được để trống.');
            return false;
        } else {
            $(currentInput).removeClass('border-red');
            $(currentInput).attr("title", '');
            return true;
        }
    }
    $("[requiredInput='true']").blur(function () {
        emptyCheck(this);
    });

    //function check email
    function emailCheck() {
        var email = $("#email-valid").val().trim();
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === "") {
            $("#email-valid").removeClass("border-red");
            $("#email-valid").removeAttr("title");
            return true;
        } else if (!regex.test(email)) {
            $("#email-valid").addClass("border-red");
            $("#email-valid").attr("title", "Email không hợp lệ.");
            return false;
        } else {
            $("#email-valid").removeClass("border-red");
            $("#email-valid").removeAttr("title");
            return true;
        }
    }

    //email validate
    $("#email-valid").blur(function () {
        emailCheck();
    });

    //function check phone
    function phoneCheck() {
        var phone = $("#number-valid").val().trim();
        var regex = /^[0-9]+$/;
        if (phone === "") {
            $("#number-valid").removeClass("border-red");
            $("#number-valid").removeAttr("title");
            return true;
        } else if (!phone.match(regex)) {
            $("#number-valid").addClass("border-red");
            $("#number-valid").attr("title", "Số điện thoại không hợp lệ.");
            return false;
        } else {
            $("#number-valid").removeClass("border-red");
            $("#number-valid").removeAttr("title");
            return true;
        }
    }

    //check phone number
    $("#number-valid").blur(function (key) {
        phoneCheck();
    });

    //ajax
    $('#btn-customer').click(function () {
        $.ajax({
            url: "api/employees",
            method: "GET",
            dataType: "html",
            success: function (data) {
                debugger
                if (data) {
                    var employees = JSON.parse(data);

                    $('#show-info').click();
                    $('.my-index-table-body').empty();
                    $('.sum-of-total-items').empty().append(employees.length);
                    $.each(employees, function (index, item) {

                        //check for empty field
                        for (var property in item) {
                            if (item[property] === null) {
                                item[property] = "";
                            }
                            else {
                                if (property === 'NgaySinh') {

                                    //change date display format
                                    var str = item[property].substr(0, 10);
                                    var time = str.split('-');
                                    str = time[2] + '/' + time[1] + '/' + time[0];
                                    item[property] = str;
                                }
                            }
                        }

                        //append data to table
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

            },
            done: function (data) {

            },
            fail: function (data) {

            }
        });
    });

    //click tải
    $("#btn-load").click(function () {
        $("#btn-customer").click();
    });

    //click cắt
    $("#save-btn").click(function () {
        var checkOK = true;

        //check required empty
        var inputCheckRequired = $("[requiredInput='true']");	//get all the element containing this attr        
        $.each(inputCheckRequired, function (index, item) {
            var status = emptyCheck(item);
            if (!status)
                checkOK = false;
        });

        //check email
        if (!emailCheck()) {
            checkOK = false;
        }

        //check phone
        if (!phoneCheck()) {
            checkOK = false;
        }

        //if input OK then save
        if (checkOK) {
            $.ajax({
                url: 'api/employees',
                type: 'POST',
                data: $('#add-form-id').serialize(),

                success: function (data, textStatus, xhr) {
                    alert("Thêm thành công mã nhân viên " + data.MaNhanVien + "");
                    $("#pa-closeAddContent").click();
                    $("#btn-customer").click();
                },

                error: function (xhr, textStatus, errorThrown) {
                    if (xhr.status === 409) {
                        alert("Mã nhân viên này đã tồn tại!");
                    }
                    else {
                        alert("Lỗi server. Vui lòng thử lại!");
                    }
                }
            });
        }
        //else show error
        else {
            alert("Thông tin nhập không hợp lệ. Vui lòng kiểm tra!");
        }
    });

    //highlight and bind data when table row clicked
    $('.my-index-table-body').on("click", "tr", function (e) {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        var id = $(this).children().first().text();
        var id_url = 'api/employees?idParam=' + id;
        $.ajax({
            url: id_url,
            method: "GET",
            dataType: "html",
            success: function (data) {
                var employee = JSON.parse(data);
                for (var property in employee) {
                    if (employee[property] === null) {
                        employee[property] = "";
                    }
                    else {
                        if (property === 'NgaySinh') {

                            //change date display format
                            var str = employee[property].substr(0, 10);
                            var time = str.split('-');
                            str = time[2] + '/' + time[1] + '/' + time[0];
                            employee[property] = str;
                        }
                    }
                }

                //append data
                $('.info_MaNhanVien').empty().append(employee.MaNhanVien);
                $('.info_HoVaTen').empty().append(employee.HoVaTen);
                $('.info_NgaySinh').empty().append(employee.NgaySinh);
                $('.info_GioiTinh').empty().append(employee.GioiTinh);
                $('.info_DiaChi').empty().append(employee.DiaChi);
                $('.info_SoDienThoai').empty().append(employee.DienThoai);
                $('.info_Email').empty().append(employee.Email);
                $('.info_ViTriCongViec').empty().append(employee.ViTriCongViec);
                $('.info_DonViCongTac').empty().append(employee.DonViCongTac);
            }
        });
    });

    $(document).on({
        ajaxStart: function () { $(".loading-layer").show(); },
        ajaxStop: function () { $(".loading-layer").hide(); }
    });

    //show table immediately after page loaded
    //$('#btn-customer').click();
});
