import { useState, useEffect } from 'react';
import api from '../../lib/axios';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Save, ChevronUp, ChevronDown, LayoutDashboard, Settings, Users, Calculator, Activity, ClipboardList, BarChart2, Grid, Loader2, MapPin, FileText, ListOrdered, Map, Briefcase, TrendingUp, Car, Lightbulb, ShieldAlert, Calendar, Smartphone, MessageSquare, Store, ShieldCheck, LogIn, Flag, AlertCircle } from 'lucide-react';
import './admin-menu-reordering.css';

interface MenuItem {
    id: string;
    name: string;
    iconName: string;
    order: number;
}

const getDefaultMenuItems = (): MenuItem[] => {
    return [
        { id: '1', name: 'Dashboard', iconName: 'LayoutDashboard', order: 1 },
        { id: '2', name: 'Company Settings', iconName: 'Settings', order: 2 },
        { id: '3', name: 'Attendance', iconName: 'ClipboardList', order: 3 },
        { id: '4', name: 'Employee Tracking', iconName: 'MapPin', order: 4 },
        { id: '17', name: 'Daily Work Report', iconName: 'FileText', order: 5 },
        { id: '18', name: 'Visit Management', iconName: 'Map', order: 6 },
        { id: '19', name: 'Payroll', iconName: 'Calculator', order: 7 },
        { id: '20', name: 'Tax Exemption', iconName: 'FileText', order: 20 },
        { id: '21', name: 'Work Allocation System', iconName: 'ClipboardList', order: 21 },
        { id: '22', name: 'Site Management', iconName: 'Briefcase', order: 22 },
        { id: '23', name: 'PMS – Performance Matrix', iconName: 'TrendingUp', order: 23 },
        { id: '24', name: 'Employee Vehicles', iconName: 'Car', order: 24 },
        { id: '25', name: 'Idea Box', iconName: 'Lightbulb', order: 25 },
        { id: '26', name: 'SOS Management', iconName: 'ShieldAlert', order: 26 },
        { id: '27', name: 'Holiday', iconName: 'Calendar', order: 27 },
        { id: '28', name: 'Mobile Device Bind', iconName: 'Smartphone', order: 28 },
        { id: '29', name: 'Manage Chat Group', iconName: 'MessageSquare', order: 29 },
        { id: '30', name: 'Vendor', iconName: 'Store', order: 30 },
        { id: '31', name: 'Background Verification (BGV)', iconName: 'ShieldCheck', order: 31 },
        { id: '32', name: 'Visitors', iconName: 'LogIn', order: 32 },
        { id: '33', name: 'Complaints', iconName: 'Flag', order: 33 },
        { id: '34', name: 'Discussion', iconName: 'MessageSquare', order: 34 },
        { id: '35', name: 'Escalation', iconName: 'AlertCircle', order: 35 },
        { id: '36', name: 'Meeting', iconName: 'Calendar', order: 36 },
        { id: '37', name: 'Timeline', iconName: 'Activity', order: 37 },
    ];
};

const getIconComponent = (iconName: string) => {
    switch (iconName) {
        case 'LayoutDashboard': return LayoutDashboard;
        case 'Settings': return Settings;
        case 'Users': return Users;
        case 'Calculator': return Calculator;
        case 'Activity': return Activity;
        case 'ClipboardList': return ClipboardList;
        case 'BarChart2': return BarChart2;
        case 'Grid': return Grid;
        case 'MapPin': return MapPin;
        case 'FileText': return FileText;
        case 'Map': return Map;
        case 'Briefcase': return Briefcase;
        case 'TrendingUp': return TrendingUp;
        case 'Car': return Car;
        case 'Lightbulb': return Lightbulb;
        case 'ShieldAlert': return ShieldAlert;
        case 'Calendar': return Calendar;
        case 'Smartphone': return Smartphone;
        case 'MessageSquare': return MessageSquare;
        case 'Store': return Store;
        case 'ShieldCheck': return ShieldCheck;
        case 'LogIn': return LogIn;
        case 'Flag': return Flag;
        case 'AlertCircle': return AlertCircle;
        case 'Calendar': return Calendar;
        case 'Activity': return Activity;
        default: return Grid;
    }
};

interface SortableItemProps {
    item: MenuItem;
    index: number;
    totalCount: number;
    moveItem: (index: number, direction: 'up' | 'down') => void;
}

function SortableItem({ item, index, totalCount, moveItem }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 'auto',
        opacity: isDragging ? 0.5 : 1,
    };

    const Icon = getIconComponent(item.iconName);

    return (
        <div ref={setNodeRef} style={style} className={`menu-item-row ${isDragging ? 'dragging' : ''}`}>
            <div className="menu-item-left">
                <div className="drag-handle" {...attributes} {...listeners}>
                    <GripVertical size={18} />
                </div>
                <div className="menu-icon-wrapper">
                    <Icon size={18} />
                </div>
                <div className="menu-item-name">
                    {item.name}
                </div>
            </div>
            <div className="menu-item-actions">
                <div className="order-badge">
                    {item.order}
                </div>
                <div className="move-buttons">
                    <button
                        className="move-btn"
                        disabled={index === 0}
                        onClick={() => moveItem(index, 'up')}
                        title="Move Up"
                    >
                        <ChevronUp size={16} />
                    </button>
                    <button
                        className="move-btn"
                        disabled={index === totalCount - 1}
                        onClick={() => moveItem(index, 'down')}
                        title="Move Down"
                    >
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminMenuReordering() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const baseItems = getDefaultMenuItems();
        try {
            const res = await api.get('/settings/ADMIN_MENU_ORDER');
            const data = res.data;
            if (data && Array.isArray(data) && data.length > 5) {
                // 1. Normalize Names Immediately
                let normalized: MenuItem[] = data.map(item => {
                    let name = item.name;
                    if (name === 'Visitors Module') name = 'Visitors';
                    if (name === 'Complaints Module') name = 'Complaints';
                    if (name === 'Discussion Module') name = 'Discussion';
                    if (name === 'Escalation Module') name = 'Escalation';
                    return { ...item, name };
                });

                // 2. Deduplicate by Name (Case Insensitive)
                const uniqueItems: { [key: string]: MenuItem } = {};
                normalized.forEach(item => {
                    const key = item.name.toLowerCase().trim();
                    if (!uniqueItems[key]) {
                        uniqueItems[key] = item;
                    }
                });
                let fetchedItems: MenuItem[] = Object.values(uniqueItems);

                // Self-heal: If Attendance was never saved in DB historically, inject it now!
                const hasAttendance = fetchedItems.some(item => item.name === 'Attendance');
                if (!hasAttendance) {
                    const attendanceItem: MenuItem = { id: '3', name: 'Attendance', iconName: 'ClipboardList', order: 3 };
                    const companySettingsIndex = fetchedItems.findIndex(item => item.name === 'Company Settings');
                    if (companySettingsIndex !== -1) {
                        fetchedItems.splice(companySettingsIndex + 1, 0, attendanceItem);
                    } else {
                        fetchedItems.splice(2, 0, attendanceItem);
                    }
                }

                // 3. Inject Missing Base Items (Normalize search)
                baseItems.forEach(baseItem => {
                    if (!fetchedItems.some(f => f.name.toLowerCase().trim() === baseItem.name.toLowerCase().trim())) {
                        fetchedItems.push({ ...baseItem, order: fetchedItems.length + 1 });
                    }
                });

                // 4. Force mandatory core positions (Only if they exist)
                const forcePosition = (name: string, targetIdx: number) => {
                    const idx = fetchedItems.findIndex(m => m.name === name);
                    if (idx !== -1 && idx !== targetIdx) {
                        const [item] = fetchedItems.splice(idx, 1);
                        fetchedItems.splice(targetIdx, 0, item);
                    }
                };

                forcePosition("Employee Tracking", 3);
                forcePosition("Daily Work Report", 4);
                forcePosition("Visit Management", 5);
                forcePosition("Payroll", 6);

                // 5. Sequential Injection (Only if missing)
                const injectAfter = (name: string, afterName: string, id: string, icon: string) => {
                    if (!fetchedItems.some(f => f.name === name)) {
                        const prevIdx = fetchedItems.findIndex(m => m.name === afterName);
                        const insertAt = prevIdx !== -1 ? prevIdx + 1 : fetchedItems.length;
                        fetchedItems.splice(insertAt, 0, { id, name, iconName: icon, order: insertAt + 1 });
                    }
                };

                injectAfter('Work Allocation System', 'Tax Exemption', '21', 'ClipboardList');
                injectAfter('Site Management', 'Work Allocation System', '22', 'Briefcase');
                injectAfter('PMS – Performance Matrix', 'Site Management', '23', 'TrendingUp');
                injectAfter('Employee Vehicles', 'PMS – Performance Matrix', '24', 'Car');
                injectAfter('Holiday', 'SOS Management', '27', 'Calendar');
                injectAfter('Mobile Device Bind', 'Holiday', '28', 'Smartphone');
                injectAfter('Manage Chat Group', 'Mobile Device Bind', '29', 'MessageSquare');
                injectAfter('Vendor', 'Manage Chat Group', '30', 'Store');
                injectAfter('Background Verification (BGV)', 'Vendor', '31', 'ShieldCheck');
                injectAfter('Visitors', 'Background Verification (BGV)', '32', 'LogIn');
                injectAfter('Complaints', 'Visitors', '33', 'Flag');
                injectAfter('Discussion', 'Complaints', '34', 'MessageSquare');
                injectAfter('Escalation', 'Discussion', '35', 'AlertCircle');
                injectAfter('Meeting', 'Escalation', '36', 'Calendar');
                injectAfter('Timeline', 'Meeting', '37', 'Activity');

                // 6. Cleanup & Final Deduplication (Just in case)
                const finalUnique: { [key: string]: MenuItem } = {};
                fetchedItems.forEach(item => {
                    const key = item.name.toLowerCase().trim();
                    if (!finalUnique[key]) {
                        finalUnique[key] = item;
                    }
                });
                fetchedItems = Object.values(finalUnique);

                // 7. Update orders sequentially
                fetchedItems.forEach((item, i) => {
                    item.order = i + 1;
                });

                setMenuItems(fetchedItems);
            } else {
                setMenuItems(baseItems);
            }
        } catch (error) {
            console.error("Error loading menu order", error);
            setMenuItems(baseItems);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setMenuItems((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);

                const reordered = arrayMove(items, oldIndex, newIndex);

                // Update order numbers sequentially
                return reordered.map((item, i) => ({
                    ...item,
                    order: i + 1
                }));
            });
        }
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === menuItems.length - 1)
        ) {
            return;
        }

        const newItems = [...menuItems];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap items
        const temp = newItems[index];
        newItems[index] = newItems[targetIndex];
        newItems[targetIndex] = temp;

        // Update order numbers sequentially
        newItems.forEach((item, i) => {
            item.order = i + 1;
        });

        setMenuItems(newItems);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await api.put('/settings/ADMIN_MENU_ORDER', menuItems);
            alert('Menu order saved successfully!');
            // Dispatch event so Sidebar can auto-refresh
            window.dispatchEvent(new Event('menuOrderChanged'));
        } catch (error) {
            console.error("Error saving menu order", error);
            alert('Failed to save menu order.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="menu-reorder-layout">
            <div className="reorder-container">
                <div className="reorder-header">
                    <div className="reorder-header-info">
                        <h2><ListOrdered className="page-title-icon" size="1em" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px", marginBottom: "2px" }} />Admin Menu Reordering</h2>
                        <p>Customize the order of modules in the left sidebar.</p>
                    </div>
                    <button className="btn-primary" onClick={handleSave} disabled={isLoading || isSaving}>
                        {isSaving ? <Loader2 size={16} className="spinner" style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                        {isSaving ? 'Saving...' : 'Save Order'}
                    </button>
                </div>

                <div className="menu-list">
                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                            <Loader2 className="spinner" size={24} style={{ margin: '0 auto', color: '#3b82f6', animation: 'spin 1s linear infinite' }} />
                            <div style={{ marginTop: '10px' }}>Loading menu configuration...</div>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={menuItems.map(i => i.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {menuItems.map((item, index) => (
                                    <SortableItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        totalCount={menuItems.length}
                                        moveItem={moveItem}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </div>
        </div>
    );
}
