import {seconds} from './config.js'

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(seconds)]);

    if (!res.ok) throw new Error('Could not load recipe')

    const data = await res.json();
    return data
  } catch (err) {
    throw err
  }
}

export const sendJSON = async function(url, uploadData) {
  try {
    const fetchPro = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData),
    })
    
    const res = await Promise.race([fetchPro, timeout(seconds)]);

    if (!res.ok) throw new Error('Could not load recipe')

    const data = await res.json();
    return data
  } catch (err) {
    throw err
  }
}
