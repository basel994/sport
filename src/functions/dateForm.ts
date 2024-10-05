export const dateForm = (date: Date) => {
    const toDate = new Date(date);
    const today = new Date();  
    const yesterday = new Date(today);  
    yesterday.setDate(today.getDate() - 1);  
    const tomorrow = new Date(today);  
    tomorrow.setDate(today.getDate() + 1);
    if (toDate.toDateString() === today.toDateString()) {  
        return "Today";  
    } else if (toDate.toDateString() === yesterday.toDateString()) {  
        return "Yesterday";  
    } else if (toDate.toDateString() === tomorrow.toDateString()) {  
        return "Tomorrow";  
    } else {  
        return `${toDate.getFullYear()}/${toDate.getMonth()}/${toDate.getDate()}`;
    }
}