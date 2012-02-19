$(document).ready(function(){
    
    // Connect the views
    $('#maintext').bind('modelupdated', app.view.textarea);
    $('#maintext').bind('modelupdated', app.view.keylist);

    // Connect the controllers
    $('#save').bind('click', app.controller.save);
    $('#reload').bind('click', app.controller.reload);
    $('#new').bind('click', app.controller.new);
    $('#delete_all').bind('click', app.controller.delete_all);
    
    // Load the model
    app.model.load();

    $.getJSON('test.json', function(data) {
        if (data.username) {
            $('#top_bar').html(data.username);
        }
    });
});

// ---------------------------------------------------------------
var app = {};
// ---------------------------------------------------------------
app.view = {
    textarea: function(event, data){
        data = data ? data : '';
        console.log(data);
        var data = (event.data) ? event.data : '';
        $(this).attr('value', data);
    },
    keylist: function(event, data){
        data = data ? data : '';
        $(this).attr('value', data);
        $('#keylist').html('');
        $(app.model.members()).each(function(id, elem){
            if (elem) $('#keylist').append('<div>'+elem+'</div>');
        });
    }
};

// ---------------------------------------------------------------
app.controller = {
    save: function(){
        var data = $('#maintext').attr('value');
        app.model.save(data);
    },
    reload: function(){
        app.model.reload();
    },
    new: function(){
        app.model.create();
    },
    delete_all: function(){
        app.model.deleteAll();
    }
};

// ---------------------------------------------------------------
app.model = {
    key: 0,
    name: 'mytext',

    // Public functions
    load: function(){
        this.addKey();
        $('#maintext').trigger('modelupdated', localStorage[this.keyname()]);
    },
    save: function(value){
        localStorage[this.keyname()] = value;
        console.log('Setting Key: ' + this.keyname() +' Value: ' + value);
        $('#maintext').trigger('modelupdated', localStorage[this.keyname()]);
    },

    get: function() {
        return localStorage[this.keyname()];
    },

    reload: function(){
        $('#maintext').trigger('modelupdated', localStorage[this.keyname()]);
    },

    create: function(){
        this.addKey();
        this.save('');
        $('#maintext').trigger('modelupdated', localStorage[this.keyname()]);
    },
    deleteAll: function(){
        localStorage.clear();
        this.create();
        $('#maintext').trigger('modelupdated', localStorage[this.keyname()]);
    },

    // Private functions
    keyname: function(){
        return this.name + ":" + this.key;
    },
    keys: function(){
        var keystring = localStorage[this.name]
        ,   keys = [];
        
        if (keystring != undefined) keys = JSON.parse(keystring);
        return keys;
    },
    setKeys: function(keys){
        console.log(JSON.stringify(keys) + this.name);
        localStorage[this.name] = JSON.stringify(keys);
    },
    addKey: function(){
        var keys = this.keys();
        var new_index = 0;
        //console.log(keys);
        $(keys).each(function(__, elem){
            if (elem >= new_index) {
                new_index = elem + 1;
                //console.log('new_index = '+new_index);
            }
        });
        this.key = new_index;
        var keys = this.keys();
        keys.push(this.key);
        this.setKeys(keys);
        $('#maintext').trigger('modelupdated', localStorage[this.keyname()]);
    },
    members: function(){
        var keys = this.keys(),
        members = [];
        
        for (var i=0; i < keys.length; i++){
            members.push(localStorage[this.name + ":" + keys[i]]);
        }
        return members;
        
    }
};