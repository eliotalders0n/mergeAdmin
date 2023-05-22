import {
  Button,
  Container,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Box,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { useState, useEffect } from "react";
import Page from "src/components/Page";
import useGetPosts from "src/hooks/useGetPosts";
import useGetHospitals from "src/hooks/useGetHospitals";
import firebase from "./../../firebase";

function Admin() {
  // Post to merge

  const [user_id, setUserID] = useState([]);
  const [user_details, setUserDetails] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((doc) => {
        setUserID(firebase.auth().currentUser.uid);
        setUserDetails(doc.data());
      });
  }, []);

  const [postText, setPostText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [postGroup, setPostGroup] = useState("");
  const [postType, setPostType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);


  console.log(" dates " + startDate + " : " + endDate);
  const handleCheckboxChange = (e) => {
    setCheckboxValue(e.target.checked);
  };

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleGroupChange = (e) => {
    setPostGroup(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  let group = useGetHospitals().docs;

  const HandlePostSubmit = async () => {
    // 1. Create a new post document in Firestore
    const postsCollection = firebase.firestore().collection("posts");
    const newPost = {
      text: postText,
      user_id: user_id,
      user_name: user_details.firstName,
      group: postGroup,
      startDate: startDate,
      endDate: endDate,
      post_status: checkboxValue,
      imageUrl: "",
      postType: postType,
      admin: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const postRef = await postsCollection.add(newPost);

    // 2. Upload the image file to Firebase Storage (if selected)
    if (imageFile) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`postImages/${postRef.id}`);
      const uploadTask = imageRef.put(imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setUploadProgress(progress);
          console.log(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          // 3. Get the download URL of the uploaded image and update the post document in Firestore
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            postRef.update({
              imageUrl: downloadURL,
            });
          });
        }
      );
    }

    // setUploading(false);
    // Reset form fields
    setPostText("");
    setImageFile([]);
    // setUploadProgress([]);
    alert("Image uploaded");
  };

  const Posts = useGetPosts().docs;

  const deleteItem = (id) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        alert("Post was deleted successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Page>
      <Container>
        <Typography variant="h4">Broadcast</Typography>

        <div>
          <TextField
            fullWidth
            value={postText}
            onChange={handleTextChange}
            id="filled-multiline-static"
            label="Your broadcast goes here"
            multiline
            rows={4}
            placeholder="Enter text here ..."
            variant="filled"
            style={{ marginBottom: "10px" }}
          />
          <br />
          <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <InputLabel id="postType">Event or Serve Announcement</InputLabel>
            <Select
              labelId="Event or Serve"
              id="postType"
              value={postType}
              label="Post Type"
              onChange={handleTypeChange}
            >
              <MenuItem value="serve">Serve</MenuItem>
              <MenuItem value="event">Event</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Group Only"
            checked={checkboxValue}
            onChange={handleCheckboxChange}
          />
          <br />
          <FormControl fullWidth style={{ marginBottom: "10px" }}>
            <InputLabel id="postType">Select Group</InputLabel>
            <Select
              disabled={!checkboxValue}
              labelId="Select Group"
              id="postGroup"
              value={postGroup}
              label="Post Type"
              onChange={handleGroupChange}
            >
              {group.map((u, index) => (
                <MenuItem value={u.GroupNumber} key={index}>
                  {u.GroupNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
                label="Start date"
                value={startDate}
                onChange={(newValue) => {const formattedDate = new Date(newValue).toLocaleDateString(); const finaldate = formattedDate.split('/').join('-'); setStartDate(finaldate)}}
              />
              <DatePicker
                label="End date"
                value={endDate}
                onChange={(newValue) => {const formattedDate = new Date(newValue).toLocaleDateString(); const finaldate = formattedDate.split('/').join('-'); setEndDate(finaldate)}}
              />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <input type="file" multiple onChange={handleImageChange} />
          <br />
          {imagePreview && (
            <img
              style={{ maxWidth: " 30vh" }}
              src={imagePreview}
              alt=" post state"
            />
          )}
          <br />
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={HandlePostSubmit}
          >
            Submit
          </Button>
        </div>

        <br />
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {Posts.filter((post) => post.admin === true).map((post) => {
              return (
                <Grid xs={6}>
                  <Card
                    key={post.id}
                    className="mx-auto my-2"
                    style={{
                      maxWidth: "30rem",
                      border: "none",
                      padding: "0",
                      boxShadow: "2px 2px 2px 2px rgba(0, 60, 60, 0.3)",
                      marginBottom: "20px",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={post.imageUrl}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.user_name}
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                      type : {post.postType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.text}
                      </Typography>
                      {post.post_status === true ? (
                        <h2>Group {post.group} Only</h2>
                      ) : (
                        <h2>Public</h2>
                      )}
                      <br />
                      {/* {user_id && user_id === post.user_id && ( */}
                      <Button
                        variant="contained"
                        onClick={() => deleteItem(post.id)}
                      >
                        Delete
                      </Button>
                      {/* )} */}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Page>
  );
}

export default Admin;
