export const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

//Adds comma(,) or an empty space at the end of a string among the list of strings in an array
export const renderListCategory = (categories) => {
  let category = "";
  for (let i = 0; i < categories.length; i++) {
    category =
      i !== categories.length - 1
        ? category.concat(categories[i].name, ", ")
        : category.concat(categories[i].name, "");
  }

  return category;
};

/**
 *
 * @param {String} type
 * @param {Object} error
 * @param {Boolean} loading
 * @returns Object
 */
export const errorHandler = (type, error, loading) => {
  var message = "Expectation Failed";
  if (
    error.response &&
    typeof error.response.data === "string" &&
    error.response.data.length !== 0
  )
    message = error.response.data;
  else if (
    error.response &&
    error.response.data.message &&
    error.response.data.message.length !== 0
  )
    message = error.response.data.message;
  return {
    type: type,
    payload: {
      success: false,
      message: message,
      ...error.response,
    },
    loading: loading,
  };
};

/**
 *
 * @param {Object} error
 * @returns Object
 */
export const catchError = (error) => {
  var message = "Expectation Failed";
  if (error) {
    if (
      error.response &&
      typeof error.response.data === "string" &&
      error.response.data.length !== 0
    )
      message = error.response.data;
    else if (
      error.response &&
      error.response.data.message &&
      error.response.data.message.length !== 0
    )
      message = error.response.data.message;
  }
  return {
    success: false,
    message: message,
    ...error?.response,
  };
};

/**
 *
 * @param {String} text
 * @param {String} fileName
 * @param {String} format
 */
export const textToDownloadFile = (text, fileName, format) => {
  let existType = fileName?.split(".").pop() === format;
  let newPath = existType ? fileName : `${fileName}.${format || "docx"}`;
  const downloadUrl = window.URL.createObjectURL(new Blob([text]));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", newPath);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
