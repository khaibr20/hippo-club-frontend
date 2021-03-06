import React, { useState } from "react"
import "./upload.css"
import Nav from "../../Controls/nav/nav"

const Upload = (props) => {
  const [postDescription, setPostDescription] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)
  const [massage, setMassage] = useState(null)

  const uploadImage = async (e) => {
    const data = new FormData()
    const file = e.target.files
    data.append("file", file[0])
    data.append("upload_preset", "hippo-club")
    data.append("cloud_name", "djwimueuq")

    const result = await fetch(
      "https://api.cloudinary.com/v1_1/djwimueuq/image/upload",
      {
        method: "POST",
        body: data,
      }
    )
    const response = await result.json()
    setImgUrl(response.secure_url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const submitPost = { imgUrl, postDescription }

    if (submitPost.postDescription == null && submitPost.imgUrl == null)
      return setMassage(
        "This post appears to be blank. Please write something or attach a link or photo to post."
      )

    const id = localStorage.getItem("id")
    await fetch(
      `https://backend-hippo-club.herokuapp.com/api/post/${id}/upload`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(submitPost),
      }
    )

    props.history.push("/")
  }

  return (
    <>
      <div className="header">
        <Nav />
      </div>
      <div className="content_container">
        <div>
          <h2 className="title">Upload</h2>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="What do you have in mind?"
                wrap="on"
                limit="255"
                onChange={(e) => {
                  if (e.target.value == null) {
                    setMassage(
                      "This post appears to be blank. Please write something or attach a link or photo to post."
                    )
                  }
                  setPostDescription(e.target.value)
                }}
              ></textarea>
              <input type="file" accept="image/*" onChange={uploadImage} />
              <br />
              <button type="submit" className="btn btn_custom">
                Post
              </button>
            </form>

            <div className="errorMsg">{massage}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Upload
