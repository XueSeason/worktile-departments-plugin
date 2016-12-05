function httpGET(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.withCredentials = true;
  xhr.send(null);
  return xhr.responseText
}

function httpPUT(url, payload) {
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', url, false);
  xhr.setRequestHeader("Accept", "application/json, text/plain, */*")
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xhr.withCredentials = true;
  xhr.send(JSON.stringify(payload))
  return xhr.responseText
}

var departmentURL = 'https://quvideo.worktile.com/api/departments'
var addMemberURL = 'https://quvideo.worktile.com/api/report/templates/5714ac56d65134647c71988b/preference?t=1480916662104'
var departmentName = '服务器部'

var resText = httpGET(departmentURL)
var res = JSON.parse(resText)
if (res.code === 200) {
  var departments = res.data
  for (var i = 0; i < departments.length; i++) {
    var department = departments[i];
    if (department.name === departmentName) {
      // 获取到部门成员的 uid
      var members = department.members.map(function(member) {
        return member.uid;
      });
      var payload = {
        members: members
      }
      var res = JSON.parse(httpPUT(addMemberURL, payload))
      if (res.code === 200) {
        console.log('add', departmentName, 'all members successly!');
      } else {
        console.log('err', res.code);
      }
    }
  }
}