export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};


//Adds comma(,) or an empty space at the end of a string among the list of strings in an array
export const renderListCategory = (categories) => {
  let category = '';
  for (let i = 0; i < categories.length; i++) {
    category =
      i !== categories.length - 1
        ? category.concat(categories[i].name, ', ')
        : category.concat(categories[i].name, '');
  }

  return category;
};
