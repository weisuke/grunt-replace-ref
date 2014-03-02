/*
 * grunt-replace-ref
 * https://github.com/weisuke/grunt-replace-ref
 *
 * Copyright (c) 2014 Wei
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('replaceref', 'Grunt plugin that used to replace file references specified in the', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options(), targetFilePaths, src, filePathMatch, replaceMatch;


        // Iterate over all specified file groups.
        this.files.forEach(function(f) {

            targetFilePaths = grunt.file.expand(options.target);
            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }

                filePathMatch = filepath.match(options.fileMatch)[0];
                replaceMatch = options.replaceMatch(filePathMatch);

                for (var i = 0, ll = targetFilePaths.length; i < ll; i++) {
                    var targetPath = targetFilePaths[i];
                    src = grunt.file.read(targetPath);
                    if(replaceMatch.test(src)){
                        src = src.replace(replaceMatch, options.toReplace(filePathMatch));
                        grunt.file.write(targetPath, src);
                        grunt.log.writeln('File reference "' + filePathMatch + '" was updated in "' + targetPath +'"');
                    }
                }

                return true;

            })

        });
    });

};
