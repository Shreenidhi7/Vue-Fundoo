import iconlist from "../iconList";
import noteService from "../../services/noteServices";

import dashboard from "../dashboard";

import { serverBus } from "../../main";

export default {
  name: "note-display",
  components: { iconlist, dashboard },
  props: {
    card: {
      type: Array,
      required: true
    },
    archived: {
      type: String
    },
    trash: {
      type: String
    }
  },
  data() {
    return {
      pinned: false,
      showDialog: false,
      updateTitle: String,
      updateDescription: String,
      updatecolor: String,
      updatecard: Object,
      parentmessage: "",

      ListOn: ""

      // active: false
    };
  },
  computed: {},
  mounted() {
    console.log("in created ");

    serverBus.$on("listOn", ListOn => {
      this.ListOn = ListOn;
      console.log("on received", this.ListOn);
    });
  },
  created() {
    // console.log("in created ");
    // serverBus.$on("listOn", ListOn => {
    //   this.ListOn = ListOn;
    //   console.log("on received", this.ListOn);
    // });
  },
  methods: {
    pin2pinned() {
      this.pinned = !this.pinned;
    },

    /********************************************************************** */

    /***
     *
     * archive card splice
     */

    archive(e) {
      let index = this.card.indexOf(e);
      this.card.splice(index, 1);
    },

    /********************************************************************** */

    /***
     *
     * unarchive card splice
     */

    unarchive(e) {
      this.archive(e);
    },

    /********************************************************************** */

    /********************************************************************** */

    /***
     *
     * unarchive card splice
     */

    trashNote(e) {
      let index = this.card.indexOf(e);
      this.card.splice(index, 1);
    },

    /********************************************************************** */

    /********************************************************************** */

    /***
     *
     * restoreNote
     */

    restore(array) {
      console.log("IN NOTE DISPLAY(restore)");

      var restoreCard = {
        restore: false,
        noteID: array._id
      };
      console.log("restore card details", restoreCard);

      noteService
        .restore(restoreCard)
        .then(res => {
          console.log("response @ noteDisplayList", res);
          let index = this.card.indexOf(array);
          this.card.splice(index, 1);
        })
        .catch(error => {
          console.log("error while getting response of trashed notes", error);
        });
    },

    /********************************************************************** */

    /********************************************************************** */

    /***
     *
     * deleteForever
     */

    deleteForever(array) {
      console.log("IN NOTE DISPLAY");
      var data = {
        noteID: array._id
      };
      noteService.deleteForever(data).then(data => {
        console.log("saddddddddddddddd(in displayNote)", data);
        let index = this.card.indexOf(array);
        this.card.splice(index, 1);
      });
    },

    /********************************************************************** */

    /********************************************************************** */

    /***
     *
     *  to pin the note
     */

    pin(array) {
      console.log("in DisplayNote aray(pin)", array);

      var pinnedData = {
        pinned: true,
        noteID: [array._id]
      };

      noteService.pinCard(pinnedData).then(res => {
        console.log("response from userService", res);
        this.unPinbar(array);
      });
    },

    unPinbar(array) {
      console.log(array, "asdfsad");
      array.pinned = true;
      this.$emit("unpinnedcards", array);
    },

    /********************************************************************** */

    /***
     *
     *  to Unpin the note
     */

    unPin(array) {
      console.log("in DisplayNote arra(unpin)", array);

      var unPinnedData = {
        pinned: false,
        noteID: [array._id]
      };

      noteService.pinCard(unPinnedData).then(res => {
        console.log("response from userService", res);
        this.pinbar(array);
      });
    },

    pinbar(array) {
      array.pinned = false;
      this.$emit("pinnedcards", array);
    },

    /********************************************************************** */

    // mouseOver: function() {
    //   this.active = true;
    // },

    // mouseOut: function() {
    //   this.active = false;
    // }

    /********************************************************************** */

    /***
     *
     *  to Unpin the note
     */

    showDialogPopUp(card) {
      console.log("in dialog box", card);

      this.showDialog = true;
      this.updateTitle = card.title;
      this.updateDescription = card.description;
      this.updatecolor = card.color;
      this.updatecard = card;

      console.log("end of dialog", this.updatecard);
    },

    update() {
      console.log("in Update function");

      this.showDialog = false;
      var data = {
        noteID: this.updatecard._id,
        title: this.updateTitle,
        description: this.updateDescription
      };
      console.log(" To update data junction", data);

      noteService
        .updateNote(data)
        .then(res => {
          console.log("response of updated notes in display note", res);
          this.updatecard.title = this.updateTitle;
          this.updatecard.description = this.updateDescription;
        })
        .catch(error => {
          console.log("error while updating notes(in display notes)", error);
        });
    }
  }
};
