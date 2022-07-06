import firebase from "../firebase";

const db = firebase.ref("/tables");

class CrudServiceForTable {
    getAll() {
        return db;
    }

    create(table) {
        return db.push(table);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new CrudServiceForTable();