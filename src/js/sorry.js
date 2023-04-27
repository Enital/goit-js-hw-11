const gallery = document.querySelector('.gallery')

export function sorryFunc() {
    const closeCollection = `
    <div style="background-color: beige; margin-top: 10px; padding: 1px;">
        <p style="text-align: center; font-size: 17px; color: coral;"> 
            Sorry! But the number of pictures for free account exceeds your request. We apologize to You!
        </p>
    </div>
`;
    gallery.insertAdjacentHTML('afterend', closeCollection);
}