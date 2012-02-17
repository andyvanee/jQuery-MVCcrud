$(document).ready(function(){
    model.addKey();
    refreshSourceList();
    
    // View
    $('#maintext').bind('modelupdated', function(){
        var data = model.get();
        $(this).attr('value', data);
        $('#nav').html('');
        refreshSourceList();
    });
            
    // Controllers
    $('#save').bind('click', function(){
        var data = $('#maintext').attr('value');
        model.save(data);
    });
    
    $('#reload').bind('click', function(){
        model.reload();
    });
    
    $('#new').bind('click', function(){
        model.create();
    });
});

function refreshSourceList(){
    $(model.members()).each(function(id, elem){
        if (elem) $('#nav').append('<div>'+elem+'</div>');
    });    
}


// Model
var model = {
    key: 0,
    name: 'mytext',
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
        localStorage[this.name] = JSON.stringify(keys);
    },
    addKey: function(){
        var keys = this.keys();
        var new_index = 0;
        console.log(keys);
        $(keys).each(function(__, elem){
            if (elem >= new_index) {
                new_index = elem + 1;
                console.log('new_index = '+new_index);
            }
        });
        this.key = new_index;
        var keys = this.keys();
        keys.push(this.key);
        this.setKeys(keys);
        $('#maintext').trigger('modelupdated');
    },
    members: function(){
        var keys = this.keys(),
        members = [];
        
        for (var i=0; i < keys.length; i++){
            members.push(localStorage[this.name + ":" + keys[i]]);
        }
        return members;
        
    },
    save: function(value){
        localStorage[this.keyname()] = value;
        console.log('Setting Key: ' + this.keyname() +' Value: ' + value);
        $('#maintext').trigger('modelupdated');
    },

    get: function() {
        return localStorage[this.keyname()];
    },

    reload: function(){
        $('#maintext').trigger('modelupdated');
    },

    create: function(){
        this.addKey();
        this.save('');
        $('#maintext').trigger('modelupdated');
    }
}