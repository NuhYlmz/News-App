import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Session } from "meteor/session";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.html";

if (Meteor.isClient) {
  let countiries = [
    {
      id: 0,
      name: "Turkey",
      tag: "tr",
    },
    {
      id: 0,
      name: "English",
      tag: "en",
    },
    {
      id: 0,
      name: "Germany",
      tag: "de",
    },
  ];
  let categories = [
    {
      id: 0,
      name: "General",
      tag: "general",
    },
    {
      id: 0,
      name: "Sport",
      tag: "sport",
    },
    {
      id: 0,
      name: "Economy",
      tag: "economy",
    },
  ];

  Template.news.onCreated(function newsOnCreated() {
    getNews();
  });

  Template.countiries.onCreated(function countiriesOnCreated() {
    Session.set("selectedCountry", "tr");
    Session.set("countiries", countiries);
  });

  Template.categories.onCreated(function categoriesOnCreated() {
    Session.set("selectedCategory", "general");
    Session.set("categories", categories);
  });
  Template.countiries.helpers({
    countiries() {
      return Session.get("countiries");
    },
  });
  Template.categories.helpers({
    categories() {
      return Session.get("categories");
    },
  });
  Template.countiries.events({
    "change #country": function (event, a) {
      Session.set("selectedCountry", event.currentTarget.value);
      getNews();
    },
  });
  Template.categories.events({
    "change #category": function (event, a) {
      Session.set("selectedCategory", event.currentTarget.value);
      getNews();
    },
  });
  Template.countiries.helpers({
    countiries() {
      return Session.get("countiries");
    },
  });
  Template.news.helpers({
    news() {
      return Session.get("news");
    },
  });

  function getNews() {
    HTTP.call(
      "GET",
      `https://api.collectapi.com/news/getNews?country=${Session.get(
        "selectedCountry"
      )}&tag=${Session.get("selectedCategory")}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: "apikey 6LXjpwcggRkuy71S6WhhqL:28aoj0gzLN3fzVTZVYlkxD",
        },
      },
      (error, result) => {
        Session.set("news", JSON.parse(result.content).result);
      }
    );
  }
}
