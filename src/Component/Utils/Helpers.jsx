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

/** Unified Portal */
export const getSubStageSteps = (variantStepList, stageName, subStageName) => {
  let arr = [];
  if (variantStepList && variantStepList.steps) {
    const stageSteps = variantStepList.steps;
    if (stageSteps && Array.isArray(stageSteps)) {
      let subStageArr = [];
      stageSteps.map(({ stepName, steps }) => {
        if (stepName === stageName) subStageArr.push(...steps);
      });
      if (subStageArr.length !== 0) {
        subStageArr.map(({ stepName, steps }) => {
          if (stepName === subStageName) arr.push(...steps);
        });
      }
    }
  }
  return arr;
};

export const getSubStageByStage = (stageArr, stageName, subStageName) => {
  let arr = [];
  if (stageArr && Array.isArray(stageArr) && stageArr.length !== 0) {
    let subStageArr = [];
    stageArr.map(({ stepName, steps }) => {
      if (stepName === stageName) subStageArr.push(...steps);
    });
    if (subStageArr.length !== 0) {
      arr = subStageArr.filter(({ stepName }) => stepName === subStageName);
    }
  }
  return arr;
};

export const bytesToMegaBytes = (bytes) => (bytes ? bytes / 1024 ** 2 : 0);

export const textToDownloadFile = (text, fileName, format) => {
  const downloadUrl = window.URL.createObjectURL(new Blob([text]));
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", `${fileName}.${format || "docx"}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
