function validateForm() {
    var code = document.forms["activationCodeValidation"]["code"].value;
    validateCode(code);
}

function validateCode(code) {
    var url = "https://api.auth.adobe.com/reggie/v1/cnbc/regcode/" + code + ".json";
    $.get(url, function (data, status) {
        $('.error-text').hide();
        $('#valid-code').val(code);
        $('.modal').modal();

    }).fail(function () {
        $('.error-text').show();
    });
}

function loginMVPD(code) {
    var mvpd = $('#mvpd-dropdown').val();
    var code = $('#valid-code').val();
    if (!mvpd || !code) {
        return false;
    }
    var url = "https://api.auth.adobe.com/api/v1/authenticate";
    var obj = {
        reg_code: code,
        requestor_id: 'cnbc',
        mso_id: mvpd,
        redirect_url: 'http://activate.cnbc.com?activationCode=' + code,
        domain_name: 'cnbc.com',
        flash: true
    };
    url = url + '?' + $.param(obj);
    window.location.href = url;
}

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const activationCode = urlParams.get('activationCode');
    if (activationCode) {
        var url = "https://api.auth.adobe.com/api/v1/checkauthn/" + activationCode + "?requestor=cnbc";
        if (activationCode) {
            $.get(url, function (data, status) {
                $(activationCodeValidation).hide();
                $('.main-header').html('Your device is ready to use');
                $('.instructions').html('You now have access to your favorite shows')
            });
        }
    }
});