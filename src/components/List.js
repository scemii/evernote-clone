import React from "react";
import { cleanText } from "../helper/html-cleaner";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    maxWidth: 360,
    backgroundColor: "black",
  },
  title: {
    margin: "0 0.5em 0 0.5em",
    color: "#00A82D",
  },
}));

export default function SelectedListItem({
  notes,
  selectedIndex,
  addingNote,
  updateTitle,
  handleListItemClick,
  deleteNote,
  newNote,
  addNewNote,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <div className="new-note-container">
          <h2 className={classes.title}>My notes</h2>
          {!addingNote ? (
            <ListItemIcon>
              <AddCircleIcon onClick={addNewNote} />
            </ListItemIcon>
          ) : (
            <h2 className={classes.title} id="pointer" onClick={addNewNote}>
              Cancel
            </h2>
          )}
        </div>
      </List>
      <Divider />
      {!addingNote ? (
        <List component="nav" aria-label="secondary mailbox folder">
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <ListItem
                key={note.id}
                button
                selected={selectedIndex === notes.indexOf(note)}
                onClick={(event) =>
                  handleListItemClick(event, notes.indexOf(note))
                }
              >
                <div className="note-container">
                  <ListItemText
                    primary={cleanText(note.title)}
                    secondary={
                      <React.Fragment>
                        {cleanText(note.body.substring(0, 30)) + "..."}
                      </React.Fragment>
                    }
                  />
                  <ListItemIcon>
                    <DeleteIcon onClick={() => deleteNote(note.id)} />
                  </ListItemIcon>
                </div>
              </ListItem>
            ))
          ) : (
            <h3 style={{ marginLeft: "0.5em" }}></h3>
          )}
        </List>
      ) : (
        <List component="nav" aria-label="secondary mailbox folder">
          <ListItem>
            <form onSubmit={newNote}>
              <input
                type="text"
                placeholder=" Enter note title"
                className="input"
                onKeyUp={(e) => updateTitle(e.target.value)}
              />
            </form>
          </ListItem>
        </List>
      )}
    </div>
  );
}
