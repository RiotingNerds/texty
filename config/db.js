module.exports = {
  mainDB: {
    url:'location',
    db: { 
      native_parser: true 
    },
    server: { 
      poolSize: 10
    },
    replset: { 
      rs_name: 'myReplicaSetName' 
    },
    user: 'myUserName',
    pass: 'myPassword'
  }
}