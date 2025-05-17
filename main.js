const form_section = document.getElementById("form");
const ticket_section = document.getElementById("ticket_section");

const image_file = document.getElementById("image_upload");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const github = document.getElementById("github");
const form = document.getElementById("info");
const upload = document.getElementById("upload");
const ticket_number = document.getElementById("ticket_number");

const email_regex =
  /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;
const github_regex = /@[A-Za-z0-9]+/i;

let file;

image_file.addEventListener("change", (e) => fileChange(e));
form.addEventListener("submit", (e) => onsubmit(e));

function onsubmit(e) {
  e.preventDefault();
  let fileOk = false;
  let nameOk = false;
  let emailOk = false;
  let githubOk = false;

  let emailTest = email_regex.test(email.value);
  let githubTest = github_regex.test(github.value);

  const error_name = document.getElementById("error_name");
  const error_email = document.getElementById("error_email");
  const error_github = document.getElementById("error_github");
  const image_messege = document.getElementById("image_message");

  if (image_file.files.length == 0) {
    fileOk = false;
    image_messege.innerHTML = "File cannot be empty. Please upload your photo.";
    image_messege.style.color = "#e47466";

    setTimeout(() => {
      upload.style.animation = "error_shake";
      upload.style.animationDuration = "300ms";
    }, 300);

    upload.style.animation = "none";
  } else if (file.size > 500000) {
    fileOK = false;
    // document.getElementById("reminder_icon").style.strok = "#ff0000";   STROKE CHANGE NOT WORKING

    image_messege.innerHTML =
      "File too large. Please upload a photo under 500KB.";
    image_messege.style.color = "#e47466";

    setTimeout(() => {
      upload.style.animation = "error_shake";
      upload.style.animationDuration = "300ms";
    }, 300);

    upload.style.animation = "none";
  } else {
    fileOk = true;
    image_messege.innerHTML =
      "Upload your photo (JPG or PNG, max size: 500KB).";
    image_messege.style.color = "rgba(255, 255, 255, 0.424)";
  }

  if (fullname.value == "") {
    nameOk = false;
    error_name.style.display = "flex";
    fullname.style.borderColor = "#e47466";

    setTimeout(() => {
      fullname.style.animation = "error_shake";
      fullname.style.animationDuration = "300ms";
    }, 300);

    fullname.style.animation = "none";
  } else {
    error_name.style.display = "none";
    fullname.style.borderColor = "rgba(255, 255, 255, 0.205)";
    nameOk = true;
  }

  if (email.value == "") {
    emailOk = false;
    error_email.style.display = "flex";
    email.style.borderColor = "#e47466";

    setTimeout(() => {
      email.style.animation = "error_shake";
      email.style.animationDuration = "300ms";
    }, 300);

    email.style.animation = "none";
  } else if (emailTest) {
    error_email.style.display = "none";
    email.style.borderColor = "rgba(255, 255, 255, 0.205)";
    emailOk = true;
  } else {
    emailOk = false;
    error_email.style.display = "flex";
    email.style.borderColor = "#e47466";

    setTimeout(() => {
      email.style.animation = "error_shake";
      email.style.animationDuration = "300ms";
    }, 300);

    email.style.animation = "none";
  }

  if (github.value == "") {
    githubOk = false;
    error_github.style.display = "flex";
    github.style.borderColor = "#e47466";

    setTimeout(() => {
      github.style.animation = "error_shake";
      github.style.animationDuration = "300ms";
    }, 300);

    github.style.animation = "none";
  } else if (githubTest) {
    githubOk = true;
    error_github.style.display = "none";
    github.style.borderColor = "rgba(255, 255, 255, 0.205)";
  } else {
    githubOk = false;
    error_github.style.display = "flex";
    github.style.borderColor = "#e47466";

    setTimeout(() => {
      github.style.animation = "error_shake";
      github.style.animationDuration = "300ms";
    }, 300);

    github.style.animation = "none";
  }

  if (emailOk && nameOk && githubOk && fileOk) {
    document.getElementById("name_container").innerHTML = fullname.value;
    document.getElementById("email_container").innerHTML = email.value;
    document.getElementById("ticket_name_container").innerHTML = fullname.value;
    document.getElementById("github_container").innerHTML = github.value;
    const user_image = document.getElementById("user_image");

    user_image.style.height = "50px";
    user_image.style.width = "auto";
    user_image.src = `${URL.createObjectURL(file)}`;

    ticket_number.innerHTML = `#${ticketNum()}`;

    form_section.style.display = "none";
    ticket_section.style.display = "flex";
  }
}

function fileChange(e) {
  file = e.target.files[0];
  const upload_element = document.getElementById("upload_icon");
  upload_element.style.padding = "0px";
  upload_element.style.height = "40px";
  upload_element.style.width = "auto";
  upload_element.src = `${URL.createObjectURL(file)}`;
}

function ticketNum() {
  const randNum = Math.floor(Math.random() * 999999) + 1;

  return randNum;
}
