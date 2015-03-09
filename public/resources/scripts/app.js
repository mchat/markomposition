require.config({
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    },
    baseUrl: '/markomposition/public/resources/scripts',
    paths: {
        'jquery': '/markomposition/public/vendor/jquery.min',
        'bootstrap':'//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min'
    }
});

/**
 * Set up any global utility methods that will be used in the application.
 */
var setUpUtilities = function (Config) {
    'use strict';

    // String format, from http://stackoverflow.com/a/4673436
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, num) {
                return typeof args[num] !== 'undefined' ?
                    args[num] : match;
            });
        };
    }

    /**
     * Return the current Bootstrap device view.
     * From http://stackoverflow.com/a/15150381
     *
     * @return {string} current Bootstrap device view
     */
    var findBootstrapEnvironment = function findBootstrapEnvironment() {
        var envs = ['xs', 'sm', 'md', 'lg'];

        var $el = $('<div>');
        $el.appendTo($('body'));

        for (var i = envs.length - 1; i >= 0; i--) {
            var env = envs[i];

            $el.addClass('hidden-' + env);
            if ($el.is(':hidden')) {
                $el.remove();
                return env;
            }
        }
    };

    $.ajax({
        url: '/markomposition/public/resources/IPhOD2_Words_Adapted.json',
        success: function (data) {
            Config.iphodCorpus = data;
        }
    });

    $('#formTab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
};

var loadFile = function (Config, filename)
{
    $('#feedbackText').show();

    $.ajax({
        url: '/markomposition/public/resources/texts/' + filename,
        success: function (data) {
            Config.textInput.val(data);
            $('#feedbackText').hide();
        }
    });
};

/**
 * Initialize game environment and start the application.
 */
require([
    'jquery',
    'app.config',
    'generate',
    'bootstrap'
], function ($, Config, Generate) {

    'use strict';

    setUpUtilities(Config);

    Config.submitBtn.off('click');
    Config.submitBtn.click(Generate);

    $('#dickinson').click(function ()
    {
        loadFile(Config, 'dickinson.txt');
    });

    $('#dante').click(function ()
    {
        loadFile(Config, 'divine_comedy.txt');
    });

    $('#grimm').click(function ()
    {
        loadFile(Config, 'grimm.txt');
    });

});