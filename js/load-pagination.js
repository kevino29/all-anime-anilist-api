async function loadPagination() {
    let pageNav = document.createElement('nav');
    pageNav.setAttribute('aria-label', 'Page Navigation');
    pageNav.classList.add('sticky-top', 'mt-4', 'pt-2');
    pageNav.style.zIndex = 1;

    pageNav.innerHTML =
    `
    <ul id="pageList" class="pagination pagination-sm pagination-circle justify-content-center w-100">
        <li id="page-item-prev" class="page-item mx-1">
            <button id="page-link-0" class="page-link">Previous</button>
        </li>
        <li class="page-item mx-1">
            <button id="page-link-1" class="page-link"></button>
        </li>
        <li class="page-item mx-1">
            <button id="page-link-2" class="page-link"></button>
        </li>
        <li class="page-item mx-1">
            <button id="page-link-3" class="page-link"></button>
        </li>
        <li class="page-item mx-1">
            <button id="page-link-4" class="page-link"></button>
        </li>
        <li class="page-item mx-1">
            <button id="page-link-5" class="page-link"></button>
        </li>
        <li id="page-item-next" class="page-item mx-1">
            <button id="page-link-6" class="page-link">Next</button>
        </li>
    </ul>
    `;
    content.appendChild(pageNav);
    return pageNav.children[0];
}