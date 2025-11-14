/**
 * Table Component
 * Table component with sorting and pagination
 */

import { For, Show, createMemo } from 'solid-js'
import { tableStyles } from '../lib/table.styles'
import { useTableSort } from '../lib/use-table-sort'
import { useTablePagination } from '../lib/use-table-pagination'
import type { TableProps } from '../model/types'

export const Table = <T,>(props: TableProps<T>) => {
	const isDark = () => props.isDark ?? true
	const sortable = () => props.sortable ?? true
	const paginated = () => props.paginated ?? false
	const pageSize = () => props.pageSize ?? 10

	const { sortColumn, sortDirection, toggleSort, getSortDirection } =
		useTableSort<T>(
			props.defaultSortColumn,
			props.defaultSortDirection,
			props.onSortChange
		)

	// Sort data
	const sortedData = createMemo(() => {
		const data = props.data
		const columnId = sortColumn()
		const direction = sortDirection()

		if (!columnId || !direction) return data

		const column = props.columns.find(col => col.id === columnId)
		if (!column || !column.sortable) return data

		const sorted = [...data]

		if (column.sortFn) {
			sorted.sort(column.sortFn)
		} else {
			sorted.sort((a, b) => {
				const aVal = column.accessor(a)
				const bVal = column.accessor(b)

				// Handle JSX elements (convert to string for comparison)
				const aStr =
					typeof aVal === 'object' && aVal !== null
						? String(aVal)
						: String(aVal)
				const bStr =
					typeof bVal === 'object' && bVal !== null
						? String(bVal)
						: String(bVal)

				if (aStr < bStr) return direction === 'asc' ? -1 : 1
				if (aStr > bStr) return direction === 'asc' ? 1 : -1
				return 0
			})
		}

		return sorted
	})

	// Paginate data
	const {
		currentPage,
		totalPages,
		paginatedData,
		nextPage,
		prevPage,
		startIndex,
		endIndex
	} = useTablePagination<T>(
		sortedData,
		pageSize,
		props.page,
		props.onPageChange
	)

	const displayData = createMemo(() => {
		return paginated() ? paginatedData() : sortedData()
	})

	const getSortIcon = (columnId: string) => {
		const direction = getSortDirection(columnId)
		if (!direction) return 'unfold_more'
		return 'arrow_upward'
	}

	return (
		<div
			class={`table-container ${props.class || ''}`}
			style={{
				...tableStyles.container(),
				...props.style
			}}
		>
			<table style={tableStyles.table(isDark())}>
				<thead style={tableStyles.thead(isDark())}>
					<tr>
						<For each={props.columns}>
							{column => {
								const sortableColumn = sortable() && (column.sortable ?? true)
								const direction = getSortDirection(column.id)
								const align = column.align ?? 'left'

								return (
									<th
										style={tableStyles.th(isDark(), sortableColumn, align)}
										onClick={() => {
											if (sortableColumn) {
												toggleSort(column.id)
											}
										}}
										onMouseEnter={e => {
											if (sortableColumn) {
												Object.assign(
													e.currentTarget.style,
													tableStyles.thHover(isDark())
												)
											}
										}}
										onMouseLeave={e => {
											e.currentTarget.style.background = ''
										}}
										role={sortableColumn ? 'button' : undefined}
										tabindex={sortableColumn ? 0 : undefined}
										aria-sort={
											direction === 'asc'
												? 'ascending'
												: direction === 'desc'
													? 'descending'
													: 'none'
										}
									>
										{column.header}
										<Show when={sortableColumn}>
											<span
												class='material-symbols-rounded'
												style={tableStyles.sortIcon(isDark(), direction)}
											>
												{getSortIcon(column.id)}
											</span>
										</Show>
									</th>
								)
							}}
						</For>
					</tr>
				</thead>
				<tbody style={tableStyles.tbody()}>
					<For each={displayData()}>
						{(row, index) => {
							const isEven = index() % 2 === 0

							return (
								<tr
									style={tableStyles.tr(isDark(), isEven)}
									onMouseEnter={e => {
										Object.assign(
											e.currentTarget.style,
											tableStyles.trHover(isDark())
										)
									}}
									onMouseLeave={e => {
										const isEvenRow = index() % 2 === 0
										e.currentTarget.style.background = isEvenRow
											? isDark()
												? 'rgba(255, 255, 255, 0.02)'
												: 'rgba(0, 0, 0, 0.02)'
											: 'transparent'
									}}
								>
									<For each={props.columns}>
										{column => {
											const cellValue = column.accessor(row)
											const align = column.align ?? 'left'

											return (
												<td style={tableStyles.td(isDark(), align)}>
													{cellValue}
												</td>
											)
										}}
									</For>
								</tr>
							)
						}}
					</For>
				</tbody>
			</table>
			<Show when={paginated()}>
				<div style={tableStyles.pagination(isDark())}>
					<div style={tableStyles.paginationInfo(isDark())}>
						Showing {startIndex() + 1} to {endIndex()} of {props.data.length} entries
					</div>
					<div style={tableStyles.paginationControls()}>
						<button
							type='button'
							onClick={prevPage}
							disabled={currentPage() === 1}
							style={tableStyles.paginationButton(
								isDark(),
								currentPage() === 1
							)}
							onMouseEnter={e => {
								if (currentPage() !== 1) {
									Object.assign(
										e.currentTarget.style,
										tableStyles.paginationButtonHover(isDark(), false)
									)
								}
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = ''
								e.currentTarget.style.borderColor = ''
							}}
							aria-label='Previous page'
						>
							<span class='material-symbols-rounded' style={{ 'font-size': '16px' }}>
								chevron_left
							</span>
						</button>
						<span
							style={{
								padding: '0 12px',
								'font-size': '14px',
								color: isDark() ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
							}}
						>
							{currentPage()} / {totalPages()}
						</span>
						<button
							type='button'
							onClick={nextPage}
							disabled={currentPage() === totalPages()}
							style={tableStyles.paginationButton(
								isDark(),
								currentPage() === totalPages()
							)}
							onMouseEnter={e => {
								if (currentPage() !== totalPages()) {
									Object.assign(
										e.currentTarget.style,
										tableStyles.paginationButtonHover(isDark(), false)
									)
								}
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = ''
								e.currentTarget.style.borderColor = ''
							}}
							aria-label='Next page'
						>
							<span class='material-symbols-rounded' style={{ 'font-size': '16px' }}>
								chevron_right
							</span>
						</button>
					</div>
				</div>
			</Show>
		</div>
	)
}

