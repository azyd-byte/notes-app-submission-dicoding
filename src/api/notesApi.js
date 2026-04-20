const BASE_URL = 'https://notes-api.dicoding.dev/v2';

// GET NOTES
export const getNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    // console.log(result, "result GET");

    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET ARCHIVED NOTES
export const getArchivedNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    const result = await response.json();
    // console.log(result, "result");

    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CREATE NOTE
export const createNote = async (title, body) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE NOTE
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ARCHIVE NOTE
export const archiveNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// UNARCHIVE NOTE
export const unarchiveNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
