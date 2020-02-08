import { createNote } from "../../services/userServices";

import iconlist from "../../components/iconList";
import noteServices from "../../services/noteServices";

export default {
  name: "take-note",
  components: { iconlist },
  props: [],
  data() {
    return {
      pinned: false,
      flag: true,
      isLabel: [],
      isArchive: false,
      backgroundColor: "#FFFFFF",
      takeNote: {
        title: "",
        description: ""
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    reverseFlag() {
      this.flag = !this.flag;
    },

    pin2pinned() {
      this.pinned = !this.pinned;
    },

    addNote() {
      this.flag = !this.flag;
      console.log("creating note down here");

      if (this.takeNote.title == "" && this.takeNote.description == "") {
        this.backgroundColor = "#FFFFFF";
        return;
      } else {
        var note = {
          title: this.takeNote.title,
          description: this.takeNote.description,
          color: this.backgroundColor,
          archive: this.isArchive,
          trash: false,
          pinned: this.pinned
        };

        createNote(note).then(res => {
          console.log("added note", res);
          noteServices.sendMessage("From child to parent");
          this.takeNote.title = "";
          this.takeNote.description = "";
          this.backgroundColor = "#FFFFFF";
          this.isArchive = false;
          this.pinned = false;
        });
      }
    },

    changeColor(event) {
      this.backgroundColor = event;
    }
  }
};
