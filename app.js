let projectItems = document.querySelectorAll("project-items-wrapper");

projectItems.forEach(projectItem => {
    projectItem.addEventListener('mouseover', () => {
        console.log(projectItem.classList);
    })
})