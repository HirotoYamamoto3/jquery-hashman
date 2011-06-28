# jquery.hashmash.js - [jQuery](http://jquery.com/) plugin #

jquery.hashman.js provides methods to manipulate [hash](http://en.wikipedia.org/wiki/Fragment_identifier) keys and 
values directly in the browser address bar.

There are **put**, **retrieve**, **remove** and **exists** methods.

## put ##
Add/change hash key. Takes two parameters: key and value. Value is optional.

#### example 1: ####
$(window).hashman('put', 'keyboard', 'aus');

#### example 2: ####
$(window).hashman('put', 'mute');

## retrieve ##
Gets an hash key value. Will return something valuable only of value is set.
To check existence of hash key in url, despite of its value, try method exists.

#### example ####
$(window).hashman('retrieve', 'keyboard');

## exists ##
Return true or false depends on existence hash key in url. Value of that key does not matter.

#### example ####
$(window).hashman('exists', hashKey);

## remove ##
Try to remove key or key with its value (if it's set) from the url.
Return true/false depends on key requested hash key existence.

#### example ####
$(window).hashman('remove', hashKey);


## Questions? ##
* Email: avakarev@gmail.com
* Twitter: [@avakarev](http://twitter.com/#!/avakarev/)