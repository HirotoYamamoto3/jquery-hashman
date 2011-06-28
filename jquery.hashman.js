(function($, window, undefined) {

    // Parse (window.location.hash) and return javascript object.
    // For example, on url "http://example.com/somepage.html#vkeyboard=on&isearch=bottom&saved"
    // will return
    //    {
    //        vkeyboard: 'on',
    //        isearch: 'bottom',
    //        saved: undefined
    //    }
    var parseHashPairs = function() {
        var hashPairs = [];
        var rawHash = window.location.hash.replace(/^(#(!|))/, '') || '';
        console.log("");
        if (rawHash === '') { // there are no hashes
            return hashPairs;
        }

        // parse hash string into object
        var hashParts = rawHash.split('&');
        for (var i = 0, partsLen = hashParts.length; i < partsLen; i ++) {
            var pair = hashParts[i].split('=');
            hashPairs[pair[0]] = pair[1];
        }

        return hashPairs;
    };

    // Compile object back to string and assign to (window.location.hash).
    var setNewHashes = function(hashPairs) {
        var hashKey,
            newHashes = [];
        for (hashKey in hashPairs) {
            if (hashPairs[hashKey] === undefined || hashPairs[hashKey] === '') {
                newHashes.push(hashKey);
            } else {
                newHashes.push(hashKey + '=' + hashPairs[hashKey]);
            }
        }

        if (newHashes.length === 0) { // If empty object will be given
            // assign to hash property special value - '#!'
            // it will prevent window scroll top, as just '#' does
            window.location.hash = '#!';
        } else {
            window.location.hash = '#' + newHashes.join('&');
        }
    };

    // public methods
    var methods = {

        // Put new hash into the ulr, - as a result there is will
        // appear new hash or will change existing one.
        // Second parameter hashValue is optional
        // return value true or false, depends on success putting.
        put: function(hashKey, hashValue) {
            
            if(!hashKey) { // HashKey is not passed, nothing to do.
                return false;
            }

            var hashPairs = parseHashPairs();
            if (hashPairs.hasOwnProperty(hashKey) && hashPairs[hashKey] === hashValue) {
                // if such hash already exists and has the same value, nothing to do here
                return false;
            }

            hashPairs[hashKey] = hashValue;
            setNewHashes(hashPairs);
            return true;
        },

        // Return hash value of certain hash key.
        // hashKey parameter is optional. If it will not passed,
        // whole object with parsed hashed will be returned.
        retrieve: function(hashKey) {
            var hashPairs = parseHashPairs();
            if(!hashKey) { // return whole object with parsed hashes
                return hashPairs;
            } else if (hashPairs[hashKey]) {
                return hashPairs[hashKey]; // return value of certain hash
            } else {
                return undefined;
            }
        },

        // Return true if certain hash key is already exists in url.
        // And return false in other case.
        exists: function(hashKey) {
            return parseHashPairs().hasOwnProperty(hashKey);
        },

        // Cut certain hash from url.
        remove: function(hashKey) {
            var hashPairs = parseHashPairs();
            if (!hashPairs.hasOwnProperty(hashKey)) { // nothing to remove
                return false;
            }

            delete hashPairs[hashKey]; // removed hash from parsed object
            setNewHashes(hashPairs); // and set new hash string
            return true;
        }
    };

    $.fn.hashman = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.hashman');
        }
    };
})(jQuery, this);