import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import type { GridColDef, GridRenderCellParams, GridSortModel } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type { CrudService, EntityBase, Filter, InjectionKey } from '@/react-utils';
import { inject, NotificationType, NOTIFIER, useNavigate } from '@/react-utils';
import { Add, Close, ContentCopy, DeleteForever, Edit, Search } from '@mui/icons-material';
import ConfirmationDialog from './ConfirmationDialog.tsx';

export type TableProps<T extends EntityBase> = {
	/**
	 * The title of the table
	 */
	title: string

	/**
	 * The name of the entity type. Should essentially be a human-friendly version of the backing entity name on the server.
	 */
	entityTypeName: string

	/**
	 * Generates the name of an entity for displaying to the user in the delete form
	 *
	 * @param item The item representing the current row of the table
	 */
	generateEntityName: (item: T|null|undefined) => string|null|undefined

	/**
	 * The service key of the {@link CrudService} that is used to interact with the entities displayed in the table
	 */
	serviceKey: InjectionKey<CrudService<T>>

	/**
	 * Whether to hide the search bar at the top of the table
	 */
	hideSearch?: boolean

	/**
	 * The columns to render
	 */
	columns: GridColDef[]

	/**
	 * Whether to hide the action button in the upper right corner of the table
	 */
	hideActionButton?: boolean

	/**
	 * Whether to hide the actions that can be performed on an entity in the table
	 */
	hideActions?: boolean

	/**
	 * Whether to hide the copy ID action in the actions menu
	 */
	hideCopy?: boolean

	/**
	 * Whether to hide the edit button in the actions menu
	 */
	hideEdit?: boolean

	/**
	 * Whether to hide the delete button in the actions menu
	 */
	hideDelete?: false

	/**
	 * A render function that can render a custom action button in the upper right corner of the table. If this renderer is present, its result replaces the default action button.
	 */
	actionButtonRenderer?: () => ReactNode

	/**
	 * A render function that can render items in the acttion menu of the table. This render function renders items <em>in addition to</em> the edit and delete buttons rendered by default. If you want to create your own edit or delete buttons with customized functionality, use the <code>hideEdit</code> and/or <code>hideDelete</code> props and add your custom buttons to this render function.
	 *
	 * @param item The item representing the current row of the table
	 */
	actionMenuRenderer?: (item: T) => ReactNode
}

export default function Table<T extends EntityBase>(props: TableProps<T>) {
	const {
		title,
		entityTypeName,
		serviceKey,
		hideSearch = false,
		columns,
		hideActionButton = false,
		hideActions = false,
		hideCopy = false,
		hideEdit = false,
		hideDelete = false,
		generateEntityName,
		actionButtonRenderer,
		actionMenuRenderer
	} = props;

	const service = inject(serviceKey);

	const [ searchTerm, setSearchTerm ] = useState('');
	const [ page, setPage ] = useState(1);
	const [ pageSize, setPageSize ] = useState(5);
	const [ sortName, setSortName ] = useState('');
	const [ sortDescending, setSortDescending ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ triggerRender, setTriggerRender ] = useState(false);
	const [ rows, setRows ] = useState<T[]>([]);
	const [ rowCount, setRowCount ] = useState(0);
	const [ modalOpen, setModalOpen ] = useState(false);
	const selectedItem = useRef<T|null>(null);
	const location = useLocation();
	const navigate = useNavigate();

	// Set up data loading
	const loadResults = async () => {
		const filter: Filter = {
			searchTerm,
			pageSize,
			sortName,
			page,
			sortDescending
		};

		setIsLoading(true);
		const result = await service.readAll(filter);
		setRows(result.items);
		setRowCount(result.totalCount)
		setIsLoading(false);
	};

	const handleAddClicked = () => {
		const currentUrl = location.pathname;
		navigate(`${currentUrl}/add`);
	}

	const handleEditClicked = (item: T) => {
		const currentUrl = location.pathname;
		navigate(`${currentUrl}/${item.id}`);
	}

	const handleDeleteClicked = async (item: T) => {
		// await onDeleteButtonClick?.(item);
		setModalOpen(true);
		selectedItem.current = item;
	}

	// Set up columns
	if (!hideActions) {
		// Remove existing actions - we need this to be fresh
		const i = columns.findIndex(c => c.field === 'actions')
		if (i > -1) {
			columns.splice(i, 1);
		}

		columns.push({
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			flex: 1,
			valueGetter: (_params, row) => row,
			renderCell: ({ value }: GridRenderCellParams<any, T>) => {
				const entityName = generateEntityName(value);

				return (
					<>
						{actionMenuRenderer?.(value!)}
						{!hideCopy && (
							<IconButton
								color='primary'
								onClick={async () => {
									await navigator.clipboard.writeText(value!.id);
									const notifier = inject(NOTIFIER);
									notifier('ID copied to clipboard', NotificationType.Success);
								}}
								title='Copy ID to clipboard'
							>
								<ContentCopy/>
							</IconButton>
						)}
						{!hideEdit && (
							<IconButton
								color='warning'
								onClick={() => handleEditClicked(value!)}
								title={`Edit ${entityName}`}
							>
								<Edit/>
							</IconButton>
						)}
						{!hideDelete && (
							<IconButton
								color='error'
								onClick={() => handleDeleteClicked(value!)}
								title={`Delete ${entityName}`}
							>
								<DeleteForever/>
							</IconButton>
						)}
					</>
				)
			}
		});
	}

	columns.forEach(c => c.flex ??= 1);

	// Search input adornments
	const searchIcon = (
		<Search
			color='inherit'
			sx={{ mr: 1 }}
			fontSize='medium'
		/>
	);

	const resetButton = searchTerm && (
		<IconButton
			size='small'
			color='inherit'
			onClick={() => setSearchTerm('')}
		>
			<Close fontSize='small'/>
		</IconButton>
	);

	// Action button
	const actionButtonContent = actionButtonRenderer
		? actionButtonRenderer()
		: (
			<IconButton
				color='inherit'
				sx={{ ml: 4 }}
				onClick={handleAddClicked}
				title={`Add new ${entityTypeName}`}
			>
				<Add/>
			</IconButton>
		);

	// All filter variables should trigger an immediate table reload...
	useEffect(() => {loadResults()}, [pageSize, sortName, page, sortDescending, triggerRender]);

	// ...except searchTerm, which is typed and should be debounced
	useEffect(() => {
		const id = setTimeout(loadResults, 500);
		return () => clearTimeout(id);
	}, [searchTerm]);

	const handleSortModelChange = (sortModel: GridSortModel) => {
		if (sortModel.length < 1) {
			setSortName('');
			setSortDescending(false);
			return;
		}

		setSortName(sortModel[0].field);
		setSortDescending(sortModel[0].sort === 'desc');
	};

	return (
		<Box>
			{/* Header box */}
			<Box
				sx={{
					bgcolor: 'primary.main',
					color: 'white',
					px: 3,
					py: 2,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Typography color='common.white'>{title}</Typography>
				{!hideActionButton && actionButtonContent}
			</Box>
			<Box sx={{
				display: 'flex',
				justifyContent: 'end'
			}}>
				{!hideSearch && (
					<TextField
						color='primary'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						sx={{
							my: 2,
							minWidth: 300,
							maxWidth: '45%',
							'& .MuiInputBase-input': { p: 0	}
						}}
						slotProps={{
							input: {
								startAdornment: searchIcon,
								endAdornment: resetButton,
								sx: {
									p: 2,
									height: '40px'
								}
							}
						}}
					/>
				)}
			</Box>

			{/* Main content */}
			<DataGrid
				columns={columns}
				rows={rows}
				rowCount={rowCount}
				paginationModel={{ pageSize, page: page - 1  }}
				onPaginationModelChange={model => {
					setPage(model.page + 1);
					setPageSize(model.pageSize);
				}}
				pageSizeOptions={[5,10,25]}
				onSortModelChange={handleSortModelChange}
				loading={isLoading}
				paginationMode='server'
				sortingMode='server'
				disableColumnMenu
				disableRowSelectionOnClick
				sx={{
					'&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {outline: 'none'},
				}}
			/>
			{!hideDelete && (
				<ConfirmationDialog
					title={`Delete ${entityTypeName}`}
					open={modalOpen}
					question={`Are you sure you want to delete ${props.generateEntityName(selectedItem.current)}? This cannot be undone!`}
					confirmText="Yes, I'm sure"
					cancelText='No, keep it'
					color='error'
					onConfirm={async () => {
						// Shouldn't ever happen...but, you know...
						if (!selectedItem.current) return;

						await service.delete(selectedItem.current.id);
						setModalOpen(false);
						setTriggerRender(!triggerRender);
					}}
					onCancel={() => setModalOpen(false)}
				/>
			)}

		</Box>
	);
}