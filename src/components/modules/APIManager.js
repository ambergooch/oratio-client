const remoteURL = "http://localhost:8000"

export default Object.create(null, {
  get: {
    value: function (name, id) {
      return fetch(`${remoteURL}/${name}/${id}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
      }).then(e => e.json())
    }
  },
  getMy: {
    value: function (myproducts) {
      return fetch(`${remoteURL}/${myproducts}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
      }).then(e => e.json())
    }
  },
  getAll: {
    value: function (name) {
      return fetch(`${remoteURL}/${name}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
      }).then(e => e.json())
    }
  },
  post: {
    value: function (name, newObject) {
      return fetch(`${remoteURL}/${name}`, {
        "method": "POST",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(newObject)
      }).then(data => data.json())
    }
  },
  put: {
    value: function(name, updatedObject) {
      return fetch(`${remoteURL}/${name}/${updatedObject.id}`, {
        "method": "PUT",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(updatedObject)
      })
    }
  },
  delete: {
    value(name, id) {
      return fetch(`${remoteURL}/${name}/${id}`, {
        "method": "DELETE",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        }
      })
    }
  }
})