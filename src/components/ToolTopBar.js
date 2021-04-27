import { IonCard, IonCardContent, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { cartOutline, closeOutline, ellipsisVerticalOutline, refreshOutline, reorderFourOutline, searchOutline, shareSocialOutline } from 'ionicons/icons';
import { menuFilter, pageNavigators, searchFilers } from '../content/contents';
import { useHistory } from 'react-router';
import { useStore } from '../context/Context';
import { routes } from '../global/routes';


export const ToolBar = ({sideMenu,onSearch,refresh,share,home,mostResent,deals}) =>{
    const history = useHistory();
    const [showMenuOptions, setShowMenuOptions] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const triggerSearch = (value) =>{
        const page = history.location.pathname;
        if (typeof onSearch === "function") onSearch(page, value);
    }

    const accountMenuToggle = () =>{
        if (showMenuOptions) setShowMenuOptions(false);
        else setShowMenuOptions(true);
    }
    const filterMenuToggle = () =>{
        if (showFilterMenu) setShowFilterMenu(false);
        else setShowFilterMenu(true);
    }
    return(
        <>
            <div style={{backgroundColor:"var(--tool-bar)"}}>
                <div className="toolbar-container" style={{textAlign:"center"}}>
                    <Title/>
                    <SearchBar hidden={onSearch} onSearch={triggerSearch}/>
                    <AccountsMobileMenu onClick={accountMenuToggle} />
                    <Cart/>
                    <AccountsMenu onClick={accountMenuToggle} />
                </div>
                <div className="mini-toolbar-container divider">
                    <div hidden={sideMenu} style={{height:"30px"}} />
                    <span hidden={!sideMenu} onClick={filterMenuToggle} style={{position:"relative",marginRight:"10px"}}>
                        <IonIcon style={{marginRight:"35px",fontSize:"25px"}} icon={reorderFourOutline}/>
                        <span className="float-right" style={{border:"none"}}>{searchFilers[0]}</span>
                    </span>
                    <div className="search-filter-option" style={{position:"relative"}}>
                        <div className="float-left">
                            {searchFilers.map((filter, key)=>(
                                <label onClick={()=>triggerSearch(filter)} hidden={filter === searchFilers[0] || !mostResent || !deals} key={key}>{filter}</label>
                            ))}
                            <label hidden={!home} onClick={()=>history.push(routes.home)}>Home</label>
                            <label hidden={!refresh} onClick={()=>onSearch(history.location.pathname,"")}>&#x21bb;</label>
                            
                            <label hidden={!share} onClick={share} style={{paddingLeft:"25px"}} className="float-right search-bar-share">
                                <IonIcon class="float-left" style={{left:"5px"}} icon={shareSocialOutline}/>
                                <span style={{border:"none"}}>Share</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <FilterSideMenu
                isOpen={showFilterMenu}
                onClose={filterMenuToggle}
                onSearch={triggerSearch}
            />
            <OptionsList isOpen={showMenuOptions} onClose={accountMenuToggle}/>
        </>
    )
}
const Title = () =>{
    return(
        <IonItem style={{float:"left"}} class="inline search-text" lines="none">
            <IonLabel>Fashion-App</IonLabel>
        </IonItem>
    )
}
const Cart = () =>{
    const history = useHistory();
    const { cart } = useStore();
    return(
        <IonItem onClick={()=>history.push(routes.cart)} style={{float:"right"}} class="inline search-text" lines="none">
            <IonIcon class="search-text" icon={cartOutline}/>
            <span hidden={!cart.length} className="cart-count-container">
                <span className="float-center">{cart.length}</span>
            </span>
        </IonItem>
    )
}
const SearchBar = ({onSearch, hidden}) =>{
    const [size, setSize] = useState("search-small-on-mobile");
    const [searchValue, setSearchValue] = useState("");

    const triggerSearch = () =>{
        if (typeof onSearch === "function") onSearch(searchValue);
        setSize("search-mobil-effect-on-onpen");
    }

    const onEnterPress = (e) =>{
        if (e.key === "Enter") triggerSearch();
    }
    
    return(
        <IonItem hidden={!hidden} onFocus={()=>setSize("search-mobil-effect-on-onpen")} onBlur={()=>setSize("search-small-on-mobile")} className={`search-container search-text ${size}`} lines="none">
            <div className="search-sub-container">
                <input onKeyPress={onEnterPress} onChange={(e)=>setSearchValue(e.target.value)} className="search-input" placeholder="Search" value={searchValue} />
                <IonIcon hidden={!searchValue} onClick={()=>setSearchValue("")} class="search-clear" icon={closeOutline}/>
                <IonIcon onClick={triggerSearch} class="search-icon" icon={searchOutline}/>
            </div>
        </IonItem> 
    )
}
const AccountsMenu = ({onClick}) =>{
    return(
        <IonItem onClick={onClick} class="search-text hide-on-mobile" style={{float:"right"}} lines="none">
            <IonLabel>Acount</IonLabel>
        </IonItem>
    )
}
const AccountsMobileMenu = ({onClick}) =>{
    return(
        <IonItem onClick={onClick} class="hide-on-desktop" style={{float:"right"}}>
            <IonIcon class="search-text" icon={ellipsisVerticalOutline}/>
        </IonItem>
    )
}
const OptionsList = ({isOpen,onClose}) =>{
    const { isSignIn, signOut } = useStore();
    const history = useHistory();

    const hideShare = (cmd) =>{
        if (cmd === "share") return true;
        else if (cmd === history.location.pathname) return true;
        return false;
    }
    return(
        <div hidden={!isOpen} onClick={onClose} className="tools-options-menu-backdrop">
            <div onClick={(e)=>e.stopPropagation()} className="float-top-right white-bg pad-xl side-menu-ease-out">
                <div style={{textAlign:"right"}}>
                    <button hidden={isSignIn} onClick={()=>history.push(routes.signIn)} className="btn btn-click btn-hover-2 margin-l-r pad btn-shadow">Sign in</button>
                    <button hidden={!isSignIn} onClick={()=>signOut()} className="btn btn-click btn-hover-2 margin-l-r pad btn-shadow white-bg dark-fg">Sign out</button>
                </div>
                <div style={{marginTop:"10px"}}>
                    {pageNavigators.map((page, key)=>(
                        <IonList hidden={hideShare(page.route)}style={{borderBottom:"1px solid lightgray"}} key={key}>
                            <button onClick={()=>{onClose();history.push(page.route)}} className="text-hover btn-flat">{page.title}</button>
                        </IonList>
                    ))}
                </div>
            </div>
        </div>
    )
}

const FilterSideMenu = ({isOpen,onClose,onSearch}) =>{

    const triggerSearch = (search) =>{
        if (typeof onSearch === "function") onSearch(search);
        if (typeof onClose === "function") onClose();
    }
    return(
        <div hidden={!isOpen} onClick={onClose} className="tools-options-menu-backdrop">
            <div className="float-top-left white-bg side-menu-ease-out side-menu-ease-out pad" onClick={(e)=>e.stopPropagation()}>
                <div style={{whiteSpace:"nowrap"}}>
                    <IonItemDivider>Fashion App</IonItemDivider>
                    <div>
                        {searchFilers.map((filter, key)=>(
                            <div className="pad" style={{userSelect:"none"}} key={key}>
                                <div onClick={()=>triggerSearch(filter)}>{filter}</div>
                            </div>
                        ))}
                    </div>
                    <IonItemDivider></IonItemDivider>
                    <div>
                        {menuFilter.map((filter, key)=>(
                            <div className="pad" style={{userSelect:"none"}} key={key}>
                                <div onClick={()=>triggerSearch(filter)}>{filter}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}