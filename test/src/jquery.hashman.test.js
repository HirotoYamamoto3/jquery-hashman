test("test jquery.hashman.js", function() {

    var hashman = $(window).hashman;

    equal(typeof hashman, 'function', 'Plugin is loaded');

    window.location.hash = '#user=avakarev&device=iphone&debug=1&verified'

    deepEqual(hashman('parse'), {
            user    : 'avakarev',
            device  : 'iphone',
            debug   : '1',
            verified: undefined
        }, 'Hash parsed'
    );

    $(window).hashman('remove', 'verified');
    $(window).hashman('remove', 'debug');
    deepEqual(hashman('parse'), {
            user    : 'avakarev',
            device  : 'iphone'
        }, 'Params removed by single key'
    );


    $(window).hashman('put', 'device', 'ipad');
    deepEqual(hashman('parse'), {
            user    : 'avakarev',
            device  : 'ipad'
        }, 'Param changed'
    );

    $(window).hashman('put', 'vendor', 'apple');
    ok(hashman('exists', 'vendor'), 'Added param exists');
    equal(hashman('retrieve', 'vendor'), 'apple', 'Added param has proper value');

});
