        var curdeg = 0;
        var img = document.querySelector('.wheel');
        img.addEventListener('click', onClick, false);
        var click = false;

        function onClick() {
            if (click) {
                return false;
            } else {
                click = true;
                var stdid = "16007" + $("#stdID").val();
                if (stdid != "" && $.isNumeric(stdid) && stdid.length == 10) {
                    $(".alerr").hide();
                } else {
                    $(".alerr").show();
                    $("#stdID").focus();
                    return false;
                }
                this.removeAttribute('style');
                loadingText();
                randDeg(curdeg, function(chance) {
                    getdeg = chance;
                    curdeg = getdeg.deg;
                    var rotation = curdeg % 360;

                    var css = '-webkit-transform: rotate(' + (Math.abs(curdeg)) + 'deg);';
                    document.querySelector('.wheel').setAttribute(
                        'style', css
                    );
                    var house;
                    if (rotation > 0 && rotation <= 90) {
                        house = 'เจ้าหน้าใหม่ คงเป็นสาวกหุ่นเขียวสินะ Kotlin นี่ละที่เหมาะกับเจ้า !!';
                    } else if (rotation >= 91 && rotation <= 180) {
                        house = 'ดูจากหน้าตาที่ไม่ค่อยอัพเดทแล้ว เจ้าคงเหมาะกับ Cobol ที่สุดแล้วละ !!';
                    } else if (rotation >= 181 && rotation <= 270) {
                        house = 'อืมม เจ้าคงเข้ากับคนได้มากมายเหมือนที่ Java ใช้ได้กับ ทุก Platform ';
                    } else if (rotation >= 271 && rotation <= 360) {
                        house = 'พิษสงร้ายเยี่ยงนัก เจ้าคงเหมาะกับงู ไปอยู่กับ python ซะ !!';
                    }
                    setTimeout(function() {
                        $('.deg').html(house);
                        // $("#stdID").val("");
                        $("#stdID").focus();
                        click = false;
                        // saveJson();
                    }, 5000);
                });
            }
        }

        function randDeg(deg, callback) {
            getChance(function(chance) {
                var res = {};
                do {
                    res.deg = deg + 4000 + Math.round(Math.random() * 500);
                    res.rot = res.deg % 360;
                    if (res.rot > 0 && res.rot <= 90) {
                        res.house = 'kotlin';
                    } else if (res.rot >= 91 && res.rot <= 180) {
                        res.house = 'cobol';
                    } else if (res.rot >= 181 && res.rot <= 270) {
                        res.house = 'java';
                    } else if (res.rot >= 271 && res.rot <= 360) {
                        res.house = 'python';
                    }

                } while ($.inArray(res.house, chance) !== -1);
                console.log(res.house);
                callback(res);
            });

        }

        function getChance(callback) {
            $.ajax({
                type: "POST",
                url: "json.php",
                data: {
                    'data': 'getJson'
                },
                success: function(houseData) {
                    var data = [];
                    var forbid = [];
                    var sum = houseData.java.list.length + houseData.kotlin.list.length + houseData.cobol.list.length + houseData.python.list.length;
                    data['java'] = Math.floor((houseData.java.list.length / sum) * 10000);
                    data['kotlin'] = Math.floor((houseData.kotlin.list.length / sum) * 10000);
                    data['cobol'] = Math.floor((houseData.cobol.list.length / sum) * 10000);
                    data['python'] = Math.floor((houseData.python.list.length / sum) * 10000);

                    for (var x in data) {
                        if (data[x] > 2500) {
                            forbid.push(x);
                        }
                    }
                    console.log(forbid)
                    callback(forbid);
                },
                dataType: "json"
            });


        }



        function loadingText() {
            var text = [
                "ฮ่า ฮ่า ฮ่า มาดูกันเลยเจ้าเด็กน้อย",
                "อืมม ยากจริง ๆ ยากมาก ๆ เลย ",
                "ข้าต้องคิดให้รอบคอบซะแล้ว",
                "เอาละ เกือบจะได้แล้ว",
                "อ้า !! ใช่แล้ว บ้านนี้นี่แหละที่เหมาะกับเจ้า !!"
            ]
            $('.deg').html(text[0]);
            setTimeout(function() {
                $('.deg').html(text[1]);
            }, 500);
            setTimeout(function() {
                $('.deg').html(text[2]);
            }, 1500);
            setTimeout(function() {
                $('.deg').html(text[3]);
            }, 3000);
            setTimeout(function() {
                $('.deg').html(text[4]);
            }, 4000);
        }