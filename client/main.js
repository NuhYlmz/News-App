import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Session } from "meteor/session";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.html";

if (Meteor.isClient) {
  Template.news.onCreated(function newsOnCreated() {
    HTTP.call(
      "GET",
      "https://api.collectapi.com/news/getNews?country=tr&tag=general",
      {
        headers: {
          "content-type": "application/json",
          authorization: "apikey 6LXjpwcggRkuy71S6WhhqL:28aoj0gzLN3fzVTZVYlkxD",
        },
      },
      (error, result) => {
        Session.set('news', JSON.parse(result.content).result);
        
      }
    );
  });

  Template.news.helpers({
    news() {
      return Session.get('news')
    },
  });
  Template.body.events({
    'click #country': function (event) { 
  console.log('Template.users_insert.events click .country this._id: ' + $(event.currentTarget).find(':selected').data("id"));
    }
  });


}
