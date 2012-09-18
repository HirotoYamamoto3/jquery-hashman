(function($, window, undefined) {

    var cache = {};

    // Parse (window.location.hash) and return javascript object.
    // For example, on url "http://example.com/somepage.html#vkeyboard=on&isearch=bottom&saved"
    // will return
    //    {
    //        vkeyboard: 'on',
    //        isearch: 'bottom',
    //        saved: undefined
    //    }
    var objectify = function(arg) {
        var hashStr = (arg || window.location.hash).replace(/^(#(!|))/, '') || '',
            hashObj = {},
            kvPairs,
            pair;

        if (cache[hashStr] !== undefined) { // Return pre-cached hash object.
            return cache[hashStr];
        }

        if (hashStr === '') { // There are no hashes at all.
            return hashObj;
        }

        kvPairs = hashStr.split('&'); // Parse hash string into object.

        for (var i = 0, len = kvPairs.length; i < len; i++) {
            pair = kvPairs[i].split('=');
            hashObj[pair[0]] = pair[1];
        }

        cache[hashStr] = hashObj;

        return hashObj;
    };

    // Check if hash key is empty.
    var isEmpty = function(arg) {
        return (arg === undefined) || (arg === '');
    };

    // Compile object back to string and assign to (window.location.hash).
    var setNewHashes = function(hashPairs) {
        var hashKey,
            newHashes = [],
            hash;

        for (hashKey in hashPairs) {
            if (hashPairs.hasOwnProperty(hashKey)) {
                hash = hashKey + ( isEmpty(hashPairs[hashKey]) ? '' : '=' + hashPairs[hashKey] );
                newHashes.push(hash);
            }
        }

        // Set special value to hash - '#!', if there are no hashes anymore in url.
        // It will prevent window scroll top, as just '#' does.
        window.location.hash = !newHashes.length ? '#!' : ('#' + newHashes.join('&'));
    };

    var methods = { // Public methods.

        // Puts new hash key-value pair into current url.
        // It will add new or replace existing one.
        put: function(hashKey, hashValue) {

            if ( isEmpty(hashKey) ) { // If hash key is empty, nothing to do here.
                return;
            }

            var hashPairs = objectify();

               // If hash key is already exists and has the same value, nothing to do here.
            if ( hashPairs.hasOwnProperty(hashKey) && hashPairs[hashKey] === hashValue ) {
                return;
            }

            hashPairs[hashKey] = hashValue;
            setNewHashes(hashPairs);
        },

        // Return hash value of passed hash key.
        retrieve: function(hashKey) {
            var hashPairs = objectify();

            if ( !hashKey ) { // Return whole object with parsed hashes.
                return hashPairs;
            } else { // Return value of certain hash.
                return hashPairs[hashKey];
            }
        },

        // Check if certain hash key is present in url or not.
        exists: function(hashKey) {
            return objectify().hasOwnProperty(hashKey);
        },

        // Remove certain hash from url.
        remove: function(hashKey) {
            var hashPairs = objectify();

            if ( hashPairs.hasOwnProperty(hashKey) ) {
                delete hashPairs[hashKey]; // Removed hash from parsed object.
                setNewHashes(hashPairs); // And set new hash string.
            }
        },

        // Returns all hashes in object format, that contains pairs key => value.
        parse: function() {
            return objectify();
        }
    };

    $.fn.hashman = function(method) {

        if ( methods[method] ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.hashman');
        }
    };

})(jQuery, this);
