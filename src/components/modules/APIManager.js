const remoteURL = "http://localhost:8000"
const token = localStorage.getItem("oratio_token")

export default Object.create(null, {
  getOne: {
    value: function (name, id) {
      return fetch(`${remoteURL}/${name}/${id}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
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
          "Authorization": `Token ${token}`
        },
      }).then(e => e.json())
    }
  },
  get: {
    value: function (name) {
      return fetch(`${remoteURL}/${name}`, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
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
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(newObject)
      })
    }
  },
  put: {
    value: function(name, updatedObject, id) {
      return fetch(`${remoteURL}/${name}/${id}`, {
        "method": "PUT",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
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
          "Authorization": `Token ${token}`
        }
      })
    }
  }
})