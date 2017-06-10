        var curdeg = 0;
        var img = document.querySelector('.wheel');
        img.addEventListener('click', onClick, false);
        var houseData;
        $.getJSON("house.json", function(json) {
            houseData = json;
        });

        function onClick() {


            var stdid = "16007" + $("#stdID").val();
            if (stdid != "" && $.isNumeric(stdid) && stdid.length == 10) {
                $(".alerr").hide();
            } else {
                $(".alerr").show();
                $("#stdID").focus();
                return false;
            }



            this.removeAttribute('style');
            var deg = curdeg + 4000 + Math.round(Math.random() * 500);
            curdeg = deg;
            var css = '-webkit-transform: rotate(' + (Math.abs(curdeg)) + 'deg);';
            this.setAttribute(
                'style', css
            );
            loadingText();
            var rotation = curdeg % 360;
            setTimeout(function() {
                var house;
                if (rotation > 0 && rotation <= 90) {
                    house = 'Kotlin';
                } else if (rotation >= 91 && rotation <= 180) {
                    house = 'Cobol';
                } else if (rotation >= 181 && rotation <= 270) {
                    house = 'Java';
                } else if (rotation >= 271 && rotation <= 360) {
                    house = 'พิษสงร้ายเยี่ยงนัก เจ้าคงเหมาะกับงู ไปอยู่กับ python ซะ !!';
                }
                $('.deg').html(house);
                $("#stdID").val("");
                $("#stdID").focus();
                var savings_data = JSON.stringify(houseData);
            }, 5000);

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