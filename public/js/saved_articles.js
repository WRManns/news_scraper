const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/search/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/search');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.search-list')
    .addEventListener('click', delButtonHandler);
  