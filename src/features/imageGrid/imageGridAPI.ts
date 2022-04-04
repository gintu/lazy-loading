// A mock function to mimic making an async request for data


export function fetchImages(pageNumber = 1) {
  return new Promise<{ data: any }>((resolve,reject) =>
    {
        const data = require(`../../../JSONData/CONTENTLISTINGPAGE-PAGE${pageNumber}.json`)
        if(data) resolve(data)
        reject(new Error('error'))
    }
  );
}
