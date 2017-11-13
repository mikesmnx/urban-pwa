(function() {
    'use strict';

    var app = {
        isLoading: true,
        availDefinitions: {},
        addedDefinitions: [],
        container: document.querySelector('.main'),
        addDialog: document.querySelector('.dialog-container')
    };

    // events

    document.getElementById('butAdd').addEventListener('click', function() {
        app.toggleAddDialog(true);
    });

    document.getElementById('butAddWord').addEventListener('click', function() {
        var term = document.getElementById('new-word').value;

        app.getDefinition(term);

        app.toggleAddDialog(false);
    });

    // events

    app.toggleAddDialog = function(visible) {
        if (visible) {
          app.addDialog.classList.add('dialog-container--visible');
        } else {
          app.addDialog.classList.remove('dialog-container--visible');
        }
    };

    app.saveAddedDefinitions = function() {
        var addedDefinitions = JSON.stringify(app.addedDefinitions);
        localforage.setItem('addedDefinitions', addedDefinitions).then(function() {
            console.log('added defs updated');
        });
    };

    app.getDefinition = function(term) {
        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if (req.readyState === XMLHttpRequest.DONE) {
                
                if (req.status === 200) {
                    var resp = JSON.parse(req.response);
                    resp.term = term;
                    
                    app.updateDefinitionCard(resp);
                    app.addedDefinitions.push(term);

                    app.saveAddedDefinitions();
                }

            } 
            else {
                //console.log('no req!');
            }
        };

        req.open('GET', 'http://api.urbandictionary.com/v0/define?term=' + encodeURIComponent(term));
        //req.open('GET', 'data/stand.json');
        req.send();
    };

    app.updateDefinitions = function() {
        var keys = Object.keys(app.availDefinitions);

        keys.forEach(function(key) {
          app.getDefinition(key);
        });
    };

    app.updateDefinitionCard = function(data) {
        var def;

        if (data.term in app.availDefinitions) {
            def = app.availDefinitions[data.term];
        }
        else {
            def = document.querySelector('.def-tpl').cloneNode(true);
            def.classList.remove('def-tpl');
            
            def.querySelector('.def__term').textContent = data.term;
            def.querySelector('.def__main').textContent = data.list[0].definition;

            app.container.appendChild(def);
            
            app.availDefinitions[data.term] = def;
        }
    };

    var initData = {"term": "stand", "tags":["standing","night","one","sex","stands","up","ora","man","penis","love"],"result_type":"exact","list":[{"definition":"a group of anti fans for the k-pop girl group SNSD (So Nyeo Shi Dae; Girl's GEneration; and for antis: So Nyeo Shit Dae) The acronym stands for Stand til all nine disappear. Most anti fans hate snsd because of their ignorance and lack of manners upon their elders. Others hate them because of the image they give to younger children and because of plastic surgery.","permalink":"http://stand.urbanup.com/3970028","thumbs_up":356,"author":"nomoresoshi","word":"S.T.A.N.D.","defid":3970028,"current_vote":"","example":"\"did you see snsd last night?\"\r\n\"yeah, didnt they suck?\"\r\n\"yup! S.T.A.N.D. FTW!\"","thumbs_down":194},{"definition":"STAND (Stand 'Til All Nine Disappear) is the first international anti-fanclub for South Korean girl group [SNSD].\n\nMembers of this anti-fanclub are made of the smart kpop fans who understand SNSD are just untalented plastics who leech on other kpop artists, most notably [Super Junior] and [DBSK].","permalink":"http://stand.urbanup.com/4054668","thumbs_up":447,"author":"SUPERWONDER","word":"STAND","defid":4054668,"current_vote":"","example":"\"Gee sucks. I'm joining STAND.\"\r\n\"Black Ocean FTW. STAND FTW.\"\r\n\"SNSD are so plastic...let's STAND.\"","thumbs_down":436},{"definition":"A colloquial term describing someone or something as top quality; Evolved from a statement used to describe the quality of a guitar (able to be stood upon), later adapted to describe the level of physical attractiveness of member belonging to the opposite sex.","permalink":"http://stand.urbanup.com/5505540","thumbs_up":27,"author":"Tad Sexington II","word":"Stand","defid":5505540,"current_vote":"","example":"Example 1:\r\n\"Look, he is standing on that guitar!\"\n\nExample 2:\r\nPerson 1: \"Look at that cute blond by the front of the stage.\"\r\nPerson 2: \"I'd stand on that.\"\r\nPerson 1: \"What about that other girl?\r\nPerson 2: \"Oh yeah, stand.\"\r\nPerson 1: \"And her?\"\r\nPerson 2: \"Stand.\"","thumbs_down":18},{"definition":"Students Take Action Now: Darfur\r\n\r\nSTAND is an organization of students who promote awareness and try to help stop the genocide in Darfur.  ","permalink":"http://stand.urbanup.com/2390642","thumbs_up":29,"author":".........Laura..................","word":"STAND","defid":2390642,"current_vote":"","example":"You should start your own STAND chapter","thumbs_down":24},{"definition":"A sweet Abbrev for the judicial body of a certain sorority. When a member of said sorority is caught doing something against house rules, she is usually written down in a [girnal] then \"brought up\" to stands.\r\n\r\n","permalink":"http://stands.urbanup.com/1632305","thumbs_up":6,"author":"sweetjumps-cu","word":"Stands","defid":1632305,"current_vote":"","example":"Katrina: (loudly) OH MY GOD, THAT IS HI-LARIOUS!!!!\r\nStacey: You are too loud at the dinner table.  I am def bringing you up to stands.\r\n\r\nRenee: Mmm, this pizza is delicious.\r\nCarly: You have food in the informal, see you at stands.","thumbs_down":5},{"definition":"An amazing band from Ireland, based in New York, that has an incredibly unique, contrasting, complex, and yet simplistic sound that is none like any other band.  Although they do not have a record label, they continually mold and shape the music scene of New York City with their cutting (and top of the line) live preformances.  With previous albums such as: Beautiful Grey (day?), Correspondant, and their new Transmissions,the Irish lads have continually to build on a new sound which they have played with for a long time, and will no doubt bring them places.  www.standland.com","permalink":"http://stand.urbanup.com/1135277","thumbs_up":45,"author":"Sean H.","word":"Stand","defid":1135277,"current_vote":"","example":"I was at Arlene's Grocery last night and saw this band Stand as the final act!  Once they played a song called Overview, I was decked by how above their live and song writing ability was compared to the other band.","thumbs_down":49},{"definition":"A person who is in a queue but not actually purchasing anything or the partner or friend of someone who is.","permalink":"http://stand.urbanup.com/4144729","thumbs_up":11,"author":"mids99","word":"stand","defid":4144729,"current_vote":"","example":"Excuse me, are you in the queue or are you a stand?","thumbs_down":22},{"definition":"Lover of savages everywhere","permalink":"http://stand.urbanup.com/257671","thumbs_up":11,"author":"elfoxo","word":"stand","defid":257671,"current_vote":"","example":"Stand spent 3 hours talking to his family about savages","thumbs_down":44},{"definition":"A manifestation of your inner will or something\r\n(From the manga/anime: jojos bizarre adventure stardust crusaders)","permalink":"http://stand.urbanup.com/12028405","thumbs_up":0,"author":"KONO DIO DA!!!!!¡¡!!","word":"STAND","defid":12028405,"current_vote":"","example":"DIO:jojo! Your stand power is MUDA MUDA MUDA MUDA\r\nJotaro: yare yare...","thumbs_down":0}],"sounds":[]};

    localforage.getItem('addedDefinitions').then(function(value) {
        if (value) {
            app.addedDefinitions = JSON.parse(value);
            console.log('added defs: ', app.addedDefinitions);

            app.addedDefinitions.forEach(function(term) {
                app.getDefinition(term);
            });
        }

        //debugger
        if (!app.addedDefinitions.length) {
            app.updateDefinitionCard(initData);
            app.addedDefinitions.push('stand');
    
            app.saveAddedDefinitions();
        }
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./scripts/service-worker.js').then(function() { 
            console.log('worker registered'); 
        });
    }
})();