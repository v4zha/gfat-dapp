struct Department{
    dep_id:u32,
    prj_count:u32,
    off_count:u32,
    name:String,
    projects:Vec<u32>,
    officers:Vec<u32>,
}

enum District{
  Thiruvananthapuram,
  Kollam,
  Pathanamthitta,
  Alappuzha,
  Kottayam,
  Idukki,
  Ernakulam,
  Thrissur,
  Palakkad,
  Malapuram,
  Kozhikode,
  Wayanad,
  Kannur,
  Kasargod,
}

struct Project{
    prj_id:u32,
    dep_id:u32,
    trx_count:u32,
    name:String,
    prj_district:District,
    transactions : Vec<u32>,
    assigned_officers:Vec<u32>,
}