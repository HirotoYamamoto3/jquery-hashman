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

    $(window).hashman('put', 'vendor', 'apple');
    $(window).hashman('put', 'ceo', 'sjobs');
    $(window).hashman('put', 'location', 'cuptertino');
    ok(hashman('exists', 'vendor'), 'Added param "vendor" exists');
    equal(hashman('retrieve', 'vendor'), 'apple', 'Added param "vendor" has proper value');
    ok(hashman('exists', 'ceo'), 'Added param "ceo" exists');
    equal(hashman('retrieve', 'ceo'), 'sjobs', 'Added param "ceo" has proper value');
    ok(hashman('exists', 'location'), 'Added param "location" exists');
    equal(hashman('retrieve', 'location'), 'cuptertino', 'Added param "location" has proper value');
    deepEqual(hashman('parse'), {
            user    : 'avakarev',
            device  : 'iphone',
            debug   : '1',
            verified: undefined,
            vendor  : 'apple',
            ceo     : 'sjobs',
            location: 'cuptertino'
        }, 'Couple new params added'
    );

    $(window).hashman('put', 'ceo', 'tcook');
    equal(hashman('retrieve', 'ceo'), 'tcook', 'Existing value changed');
    $(window).hashman('put', 'verified', 'true');
    equal(hashman('retrieve', 'verified'), 'true', 'Empty value changed');

    $(window).hashman('remove', ['location', 'vendor', 'ceo', 'debug']);
    deepEqual(hashman('parse'), {
            user    : 'avakarev',
            device  : 'iphone',
            verified: 'true'
        }, 'Params removed by array keys'
    );

    $(window).hashman('remove', 'verified');
    ok(!hashman('exists', 'verified'), 'Param removed by single key');

});
