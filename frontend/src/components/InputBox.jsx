export const InputBox = ({placeholder, label, onChange}) =>{
    return(
        <div className="text-sm font-medium text-left py-2">
            {label}
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-2 border rounder border-slate-200"/>
        </div>
        
    )
}